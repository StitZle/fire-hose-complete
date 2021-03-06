import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { Button, Checkbox, FormControlLabel, Grid } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import { Select, TextField } from "@mui/material";
import { CSelect } from "../shared/input/CSelect";
import { Overlay } from "../shared/Overlay";
import { ValidatorForm } from "react-material-ui-form-validator";
import { putDepartment } from "../../utils/requests/Departments";
import { useMutation, useQueryClient } from "react-query";
import Notifications from "../shared/Notifications";
import { CTextField } from "../shared/input/CTextField";
import { departmentBuilder } from "./departmentHelper";
import { genderMenuItems } from "../shared/input/InputUtils";

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

const EditDepartmentOverlay = ({ closeOverlay, department }) => {
    const classes = useStyles();

    const queryClient = useQueryClient();

    const [gender, setGender] = useState(department.contact.gender);
    const [firstname, setFirstname] = useState(department.contact.firstname);
    const [lastname, setLastname] = useState(department.contact.lastname);
    const [mail, setMail] = useState(department.contact.mail);
    const [sendConfirmationMail, setSendConformationMail] = useState(department.sendConfirmationMail);

    const editDepartmentMutation = useMutation((departmentDto) => putDepartment(department.id, departmentDto), {
        onSuccess: () => {
            Notifications.showSuccess("Die Abteilung wurde erfolgreich aktualisiert!");
            queryClient.refetchQueries(["getAllDepartments"]).then(closeOverlay());
        },
        onError: (error) => {
            Notifications.showError("Die Abteilung konnte nicht aktualisiert werden!");
            console.log(error);
        },
    });

    return (
        <Overlay
            onClose={() => closeOverlay()}
            headerContent={<h2>{department.departmentName} aktualisieren</h2>}
            size={"m"}
        >
            <ValidatorForm
                onSubmit={() =>
                    editDepartmentMutation.mutate(
                        departmentBuilder(
                            department.departmentName,
                            department.street,
                            department.houseNumber,
                            department.postalCode,
                            department.location,
                            department.country,
                            gender,
                            firstname,
                            lastname,
                            mail,
                            sendConfirmationMail
                        )
                    )
                }
            >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            label={"Abteilung"}
                            value={department.departmentName}
                            variant="filled"
                            fullWidth={true}
                            disabled={true}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            label={"Stra??e"}
                            value={department.street}
                            variant="filled"
                            fullWidth={true}
                            disabled={true}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            label={"Hausnummer"}
                            value={department.houseNumber}
                            variant="filled"
                            fullWidth={true}
                            disabled={true}
                        />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                            label={"PLZ"}
                            value={department.postalCode}
                            variant="filled"
                            fullWidth={true}
                            disabled={true}
                        />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                            label={"Ort"}
                            value={department.location}
                            variant="filled"
                            fullWidth={true}
                            disabled={true}
                        />
                    </Grid>
                    <Grid item md={4}>
                        <Select
                            label={"Land"}
                            value={"Deutschland"}
                            variant="filled"
                            fullWidth={true}
                            disabled={true}
                        />
                    </Grid>
                    <Grid item md={4}>
                        <CSelect
                            label={"Anrede"}
                            defaultValue={[]}
                            value={gender}
                            onChange={(event) => setGender(event.target.value)}
                            options={genderMenuItems}
                            validators={["required"]}
                            errorMessages={["Die Auswahl einer Anrede ist erforderlich!"]}
                        />
                    </Grid>
                    <Grid item md={4}>
                        <CTextField
                            label={"Vorname"}
                            value={firstname}
                            onChange={(event) => setFirstname(event.target.value)}
                            validators={["required"]}
                            errorMessages={["Die Eingabe eines Vornamen ist erforderlich!"]}
                        />
                    </Grid>
                    <Grid item md={4}>
                        <CTextField
                            label={"Nachname"}
                            value={lastname}
                            onChange={(event) => setLastname(event.target.value)}
                            validators={["required"]}
                            errorMessages={["Die Eingabe eines Nachnamen ist erforderlich!"]}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <CTextField
                            label={"E-Mail"}
                            value={mail}
                            onChange={(event) => setMail(event.target.value)}
                            validators={["required", "isEmail"]}
                            errorMessages={[
                                "Die Eingabe einer E-Mail-Adresse ist erforderlich!",
                                "Die Eingegebene E-Mail-Adresse ist nicht valide!",
                            ]}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    className={classes.checkbox}
                                    checked={sendConfirmationMail}
                                    onChange={() => setSendConformationMail(!sendConfirmationMail)}
                                    color="primary"
                                />
                            }
                            label="Best??tigungsmail versenden?"
                        />
                    </Grid>
                </Grid>
                <Stack spacing={2} direction="row" className={classes.footer}>
                    <Button color="primary" variant="contained" type="submit">
                        Aktualisieren
                    </Button>
                    <Button color="primary" variant="outlined" onClick={() => closeOverlay()}>
                        Abbrechen
                    </Button>
                </Stack>
            </ValidatorForm>
        </Overlay>
    );
};

export default EditDepartmentOverlay;
