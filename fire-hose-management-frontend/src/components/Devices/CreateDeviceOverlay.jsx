import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { Button, Checkbox, FormControlLabel, Grid } from "@material-ui/core";
import { ValidatorForm } from "react-material-ui-form-validator";
import { CTextField } from "../shared/input/CTextField";
import { Overlay } from "../shared/Overlay";
import Typography from "@material-ui/core/Typography";
import { useMutation } from "react-query";
import { postDevice } from "../../utils/requests/Devices";
import Notifications from "../shared/Notifications";
import { deviceBuilder } from "./deviceHelper";
import { bool } from "prop-types";

const useStyles = makeStyles((theme) => ({
  checkbox: {
    display: "table-cell",
    verticalAlign: "middle",
  },
  footer: {
    paddingTop: "24px",
    paddingBottom: "32px",
  },
}));

export const CreateDeviceOverlay = ({ closeOverlayAndRefetch, closeOverlay }) => {
  const classes = useStyles();

  const [deviceName, setDeviceName] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [isPrimary, setIsPrimary] = useState(false);

  const addDeviceMutation = useMutation((deviceDto) => postDevice(deviceDto), {
    onSuccess: () => {
      Notifications.showSuccess(`Das Gerät: ${deviceName} wurde erfolgreich erstellt.`);
      closeOverlayAndRefetch();
    },
    onError: (error) => {
      Notifications.showError(`Das Gerät: ${deviceName} konnte nicht erstellt werden!`);
      console.log(error);
    },
  });

  return (
    <Overlay onClose={() => closeOverlay()} headerContent={<h2>Neues Gerät anlegen</h2>} size={"s"}>
      <Typography variant={"body2"}>
        Die Angabe einer Geräte-Kennung ist nicht Verpflichtend.
        <br />
        Wird das Feld nicht ausgefüllt so generiert das System automatisch eine Sechsstellige-Kennnummer. Der Gerätename
        sowie die Kennnummer kann nachträglich nicht mehr geändert werden.
      </Typography>
      <ValidatorForm onSubmit={() => addDeviceMutation.mutate(deviceBuilder(deviceName, deviceId, isPrimary))}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CTextField
              hasAutofocus={true}
              label={"Gerätename"}
              value={deviceName}
              onChange={(event) => setDeviceName(event.target.value)}
              validators={["required"]}
              errorMessages={["Die Eingabe eines Gerätenamens ist erforderlich!"]}
            />
          </Grid>
          <Grid item md={6}>
            <CTextField
              required={false}
              label={"Geräte-Kennung"}
              value={deviceId}
              onChange={(event) => setDeviceId(event.target.value)}
            />
          </Grid>
          <Grid item md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  className={classes.checkbox}
                  checked={isPrimary}
                  onChange={() => setIsPrimary(!isPrimary)}
                  color="primary"
                />
              }
              label="Primäres Gerät?"
            />
          </Grid>
        </Grid>
        <Stack spacing={2} direction="row" className={classes.footer}>
          <Button color="primary" variant="contained" type="submit">
            Anlegen
          </Button>
          <Button color="primary" variant="outlined" onClick={() => closeOverlay()}>
            Abbrechen
          </Button>
        </Stack>
      </ValidatorForm>
    </Overlay>
  );
};
