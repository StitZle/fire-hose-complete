import React, { useState } from "react";
import { Overlay } from "../shared/Overlay";
import Typography from "@material-ui/core/Typography";
import { Button, Checkbox, FormControlLabel, Grid } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, TextField } from "@mui/material";
import { useMutation } from "react-query";
import { putDevice } from "../../utils/requests/Devices";
import Notifications from "../shared/Notifications";
import { deviceBuilder } from "./deviceHelper";

const useStyles = makeStyles( ( theme ) => ({
  checkbox: {
    display: "table-cell", verticalAlign: "middle"
  }, footer: {
    paddingTop: "24px", paddingBottom: "32px"
  }
}) );

const EditDeviceOverlay = ( {  closeOverlayAndRefetch, closeOverlay, device } ) => {

  const classes = useStyles();

  const [isPrimary, setIsPrimary] = useState( device.isPrimary )

  const onSubmit = ( event ) => {
    event.preventDefault();
    editDeviceMutation.mutate( deviceBuilder( device.deviceName, device.deviceId, isPrimary ) )
  };

  const editDeviceMutation = useMutation( ( deviceDto ) => putDevice( device.id, deviceDto ), {
    onSuccess: () => {
      Notifications.showSuccess( `Das Gerät: ${device.deviceName} wurde erfolgreich aktualisiert!` )
      closeOverlayAndRefetch();
    }, onError: ( error ) => {
      Notifications.showError( `Das Gerät: ${device.deviceName} konnte nicht aktualisiert werden!` )
      console.log( error )
    }
  } )

  return (<Overlay
    onClose={() => closeOverlay()}
    headerContent={<h2>{device.deviceName} aktualisieren</h2>}
    size={"s"}>
    <Typography variant={"body2"}>
      Die Angabe einer Geräte-Kennung ist nicht Verpflichtend.<br/>
      Wird das Feld nicht ausgefüllt so generiert das System automatisch eine Sechsstellige-Kennnummer.
      Der Gerätename sowie die Kennnummer kann nachträglich nicht mehr geändert werden.
    </Typography>
    <form onSubmit={( event ) => onSubmit( event )}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label={"Gerätename"}
            value={device.deviceName}
            variant="filled"
            fullWidth={true}
            disabled={true}
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            label={"Gerätekennung"}
            value={device.deviceId}
            variant="filled"
            fullWidth={true}
            disabled={true}
          />
        </Grid>
        <Grid item md={6}>
          <FormControlLabel
            control={<Checkbox
              className={classes.checkbox}
              checked={isPrimary}
              onChange={() => setIsPrimary( !isPrimary )}
              color="primary"
            />}
            label="Primäres Gerät?"
          />
        </Grid>
      </Grid>
      <Stack spacing={2} direction="row" className={classes.footer}>
        <Button color="primary" variant="contained" type="submit">aktualisieren</Button>
        <Button color="primary" variant="outlined" onClick={() => closeOverlay()}>Abbrechen</Button>
      </Stack>
    </form>
  </Overlay>);
};

export default EditDeviceOverlay;