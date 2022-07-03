import {Button} from "@material-ui/core";
import React from "react";
import {Overlay} from "../shared/Overlay";
import Stack from "@mui/material/Stack";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {useMutation, useQueryClient} from "react-query";
import {deleteDevice} from "../../utils/requests/Devices";
import Notifications from "../shared/Notifications";

const useStyles = makeStyles( ( theme ) => ({
    underline: {
        textDecorationLine: "underline",
    },
}) );

export const DeleteDeviceOverlay = ( {
                                         closeOverlay,
                                         device
                                     } ) => {
    const classes = useStyles();

    const queryClient = useQueryClient();

    const deleteDeviceMutation = useMutation( () => deleteDevice( device.id ), {
        onSuccess: () => {
            Notifications.showSuccess( `Das Gerät: ${device.deviceName} wurde erfolgreich gelöscht!` );
            queryClient.refetchQueries( ["getAllDevices"] ).then( closeOverlay() );
        },
        onError: ( error ) => {
            Notifications.showError( `Das Gerät: ${device.deviceName} konnte nicht gelöscht werden!` );
            console.log( error );
        },
    } );

    const footerContent = (<Stack spacing={2} direction="row">
        <Button color="primary" variant="contained" type="submit" onClick={() => deleteDeviceMutation.mutate()}>
            Bestätigen
        </Button>
        <Button color="primary" variant="outlined" onClick={() => closeOverlay()}>
            Abbrechen
        </Button>
    </Stack>);

    return (<Overlay
            onClose={() => closeOverlay()}
            headerContent={<h2>Gerät: {device.deviceName} löschen?</h2>}
            footerContent={footerContent}
            size={"s"}
    >
        <Typography variant={"body2"}>
            Mit den Klick auf Bestätigen, wird das Gerät: <br/>
            <span className={classes.underline}>{device.deviceName}</span> <br/>
            unwiderruflich gelöscht!
        </Typography>
    </Overlay>);
};
