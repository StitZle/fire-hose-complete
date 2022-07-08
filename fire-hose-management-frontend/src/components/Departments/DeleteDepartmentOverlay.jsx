import Stack from "@mui/material/Stack";
import { Button } from "@material-ui/core";
import React from "react";
import { Overlay } from "../shared/Overlay";
import { useMutation, useQueryClient } from "react-query";
import { deleteDepartment } from "../../utils/requests/Departments";
import Notifications from "../shared/Notifications";
import { Alert, AlertTitle } from "@mui/material";

export const DeleteDepartmentOverlay = ({ closeOverlay, department }) => {
    const queryClient = useQueryClient();

    const deleteDepartmentMutation = useMutation(() => deleteDepartment(department.id), {
        onSuccess: () => {
            Notifications.showSuccess(`Organisation: ${department.departmentName} erfolgreich gelöscht!`);
            queryClient.refetchQueries(["getAllDepartments"]).then(closeOverlay());
        },
        onError: () => {
            Notifications.showError(`Organisation: ${department.departmentName} konnte nicht gelöscht werden!`);
        },
    });

    const footerContent = (
        <Stack spacing={2} direction="row">
            <Button color="primary" variant="contained" type="submit" onClick={() => deleteDepartmentMutation.mutate()}>
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
            headerContent={<h2>Organisation: {department.departmentName} löschen?</h2>}
            footerContent={footerContent}
            size={"s"}
        >
            <Alert severity="info">
                <AlertTitle>Wichtiger Hinweis</AlertTitle>
                Durch das löschen der Organisation <strong>{department.departmentName}</strong> wird diese
                unwiderruflich gelöscht! Ein nachträgliches wiederherstellen der Daten ist nicht möglich!
                <br />
                <br />
                Es ist möglich gelöschte Organisationen zu einem späteren Zeitpunkt zu exportieren.
            </Alert>
        </Overlay>
    );
};
