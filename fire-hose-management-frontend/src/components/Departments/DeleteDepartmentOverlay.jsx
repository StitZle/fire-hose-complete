import { makeStyles } from "@material-ui/core/styles";
import Stack from "@mui/material/Stack";
import { Button } from "@material-ui/core";
import React from "react";
import { Overlay } from "../shared/Overlay";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles( ( theme ) => ({
  underline: {
    textDecorationLine: "underline"
  }
}) );

export const DeleteDepartmentOverlay = ( {
                                           departmentName,
                                           handleClose,
                                           submitBtnFunction
                                         } ) => {
  const classes = useStyles();

  const footerContent = (
    <Stack spacing={2} direction="row">
      <Button color="primary" variant="contained" type="submit" onClick={() => submitBtnFunction()}>Bestätigen</Button>
      <Button color="primary" variant="outlined" onClick={() => handleClose()}>Abbrechen</Button>
    </Stack>
  );

  return (
    <Overlay
      onClose={() => handleClose()}
      headerContent={<h2>Abteilung: {departmentName} löschen?</h2>}
      footerContent={footerContent}
      size={"s"}>
      <Typography variant={"body2"}>
        Mit den KLick auf Bestätigen wird die Abteilung: <span
        className={classes.underline}>{departmentName}</span> <br/>
        unwiderruflich gelöscht!
      </Typography>
    </Overlay>
  );

}