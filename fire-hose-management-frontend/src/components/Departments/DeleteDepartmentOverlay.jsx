import { makeStyles } from "@material-ui/core/styles";
import Stack from "@mui/material/Stack";
import { Button } from "@material-ui/core";
import React from "react";
import { Overlay } from "../shared/Overlay";
import Typography from "@material-ui/core/Typography";
import { useMutation } from "react-query";
import { deleteDepartment } from "../../utils/requests/Departments";
import Notifications from "../shared/Notifications";

const useStyles = makeStyles((theme) => ({
  underline: {
    textDecorationLine: "underline",
  },
}));

export const DeleteDepartmentOverlay = ({ closeOverlayAndRefetch, closeOverlay, department }) => {
  const classes = useStyles();

  const deleteDepartmentMutation = useMutation(() => deleteDepartment(department.id), {
    onSuccess: () => {
      Notifications.showSuccess(`Abteilung: ${department.departmentName} erfolgreich gelöscht!`);
      closeOverlayAndRefetch();
    },
    onError: () => {
      Notifications.showError(`Abteilung: ${department.departmentName} konnte nicht gelöscht werden!`);
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
      headerContent={<h2>Abteilung: {department.departmentName} löschen?</h2>}
      footerContent={footerContent}
      size={"s"}
    >
      <Typography variant={"body2"}>
        Mit den KLick auf Bestätigen wird die Abteilung:
        <br />
        <span className={classes.underline}>{department.departmentName}</span> <br />
        unwiderruflich gelöscht!
      </Typography>
    </Overlay>
  );
};
