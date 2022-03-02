import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { Button, Checkbox, FormControlLabel, Grid } from "@material-ui/core";
import { ValidatorForm } from "react-material-ui-form-validator";
import { CTextField } from "../shared/input/CTextField";
import { Overlay } from "../shared/Overlay";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles( ( theme ) => ({
  checkbox: {
    display: "table-cell",
    verticalAlign: "middle"
  },
  footer: {
    paddingTop: "24px",
    paddingBottom: "32px"
  }
}) );

export const DeviceOverlay = ( {
                                 handleClose,
                                 headline,
                                 submitBtnText,
                                 submitBtnFunction,
                                 initialDeviceName = "",
                                 initialDeviceId = "",
                                 initialIsPrimary = false
                               }
) => {
  const classes = useStyles();

  const [deviceName, setDeviceName] = useState( initialDeviceName )
  const [deviceId, setDeviceId] = useState( initialDeviceId )
  const [isPrimary, setIsPrimary] = useState( initialIsPrimary )


  return (
    <Overlay
      onClose={() => handleClose()}
      headerContent={<h2>{headline}</h2>}
      size={"s"}>
      <Typography variant={"body2"}>
        Die Angabe einer Geräte-Kennung ist nicht Verpflichtend.<br/>
        Wird das Feld nicht ausgefüllt so generiert das System automatisch eine Sechsstellige-Kennnummer.
        Die Kennnummer kann nachträglich geändert werden.
      </Typography>
      <ValidatorForm onSubmit={() => submitBtnFunction( deviceName, deviceId, isPrimary )}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CTextField
              hasAutofocus={true}
              label={"Gerätename"}
              value={deviceName}
              onChange={( event ) => setDeviceName( event.target.value )}
              validators={["required"]}
              errorMessages={["Die Eingabe eines Gerätenamens ist erforderlich!"]}
            />
          </Grid>
          <Grid item md={6}>
            <CTextField
              required={false}
              label={"Geräte-Kennung"}
              value={deviceId}
              onChange={( event ) => setDeviceId( event.target.value )}
            />
          </Grid>
          <Grid item md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  className={classes.checkbox}
                  checked={isPrimary}
                  onChange={() => setIsPrimary( !isPrimary )}
                  color="primary"
                />
              }
              label="Primäres Gerät?"
            />
          </Grid>
        </Grid>
        <Stack spacing={2} direction="row" className={classes.footer}>
          <Button color="primary" variant="contained" type="submit">{submitBtnText}</Button>
          <Button color="primary" variant="outlined" onClick={() => handleClose()}>Abbrechen</Button>
        </Stack>
      </ValidatorForm>
    </Overlay>
  );

}