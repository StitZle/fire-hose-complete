import { Button } from "@material-ui/core";
import React from "react";
import { Overlay } from "../shared/Overlay";
import Stack from "@mui/material/Stack";
import { useMutation, useQueryClient } from "react-query";
import { deleteDevice } from "../../utils/requests/Devices";
import Notifications from "../shared/Notifications";
import { Alert, AlertTitle } from "@mui/material";

export const DeleteDeviceOverlay = ({ closeOverlay, device }) => {
    const queryClient = useQueryClient();

    const deleteDeviceMutation = useMutation(() => deleteDevice(device.id), {
        onSuccess: () => {
            Notifications.showSuccess(`Das Gerät: ${device.deviceName} wurde erfolgreich gelöscht!`);
            queryClient.refetchQueries(["getAllDevices"]).then(closeOverlay());
        },
        onError: (error) => {
            Notifications.showError(`Das Gerät: ${device.deviceName} konnte nicht gelöscht werden!`);
            console.log(error);
        },
    });

    const footerContent = (
        <Stack spacing={2} direction="row">
            <Button color="primary" variant="contained" type="submit" onClick={() => deleteDeviceMutation.mutate()}>
                Bestätigen
            </Button>
            <Button color="primary" variant="outlined" onClick={() => closeOverlay()}>
                Abbrechen
            </Button>
        </Stack>
    );

    return (
        <Overlay
            onClose={() => closeOverlay()}
            headerContent={<h2>Gerät: {device.deviceName} löschen?</h2>}
            footerContent={footerContent}
            size={"s"}
        >
            <Alert severity="info">
                <AlertTitle>Wichtiger Hinweis</AlertTitle>
                Durch das löschen des Gerätes <strong>{device.deviceName}</strong> wird dieses unwiderruflich gelöscht!
                Ein nachträgliches wiederherstellen der Daten ist nicht möglich!
                <br />
                <br />
                Es ist möglich gelöschte Geräte zu einem späteren Zeitpunkt zu exportieren.
            </Alert>
        </Overlay>
    );
};
