import { Button, CircularProgress, Grid, makeStyles, MenuItem } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useGetAllDepartments } from "../../hooks/useGetAllDepartments";
import { useGetAllDevices } from "../../hooks/useGetAllDevices";
import deepClone from "deep-clone";
import { CTextField } from "../shared/input/CTextField";
import { CLine } from "../shared/styling/CLine";
import { CSelect } from "../shared/input/CSelect";
import { ValidatorForm } from "react-material-ui-form-validator";
import { useMutation } from "react-query";
import { postOrder } from "../../utils/requests/Orders";
import { ORDER_SUCCESS } from "../../router/navigationPaths";
import { useNavigate } from "react-router-dom";
import DefaultPage from "../shared/DefaultPage";
import { genderMenuItems } from "../shared/input/InputUtils";
import { Alert } from "@mui/material";

const useStyles = makeStyles((theme) => ({
    italic: {
        fontStyle: "italic",
    },
    grid: {
        textAlign: "center",
    },
    submitButton: {
        marginTop: 20,
    },
}));

const OrderForm = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [departmentId, setDepartmentId] = useState("");

    const [contactGender, setContactGender] = useState("");
    const [contactFirstname, setContactFirstname] = useState("");
    const [contactLastname, setContactLastname] = useState("");
    const [contactOrganisationName, setContactOrganisationName] = useState("");
    const [contactMail, setContactMail] = useState("");

    const [showDevices, setShowDevices] = useState([]);
    const [nonShowDevices, setNonShowDevices] = useState([]);

    const [notes, setNotes] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    const { departments } = useGetAllDepartments();
    const { devices } = useGetAllDevices();

    const postOrderMutation = useMutation((orderDto) => postOrder(orderDto), {
        onSuccess: (response) => {
            navigate(ORDER_SUCCESS.path, {
                state: {
                    order: response.data,
                },
            });
            //TODO update this with Notifications
            console.log("Success");
        },
        onError: (error) => {
            console.log("Error");
        },
    });

    const departmentSelection = () => {
        let selectableDepartments = departments.map((department, index) => (
            <MenuItem key={index} value={department.id}>
                {department.departmentName}
            </MenuItem>
        ));

        selectableDepartments.push(
            <MenuItem key={selectableDepartments.length + 1} value={"NO_DEPARTMENT"}>
                Organisation nicht in der Liste?
            </MenuItem>
        );
        return selectableDepartments;
    };

    useEffect(() => {
        if (devices.length !== 0) {
            let showDeviceArray = [];
            let nonShowDeviceArray = [];

            devices.forEach((device) => {
                device.count = 0;
                if (device.isPrimary) {
                    showDeviceArray.push(device);
                } else {
                    nonShowDeviceArray.push(device);
                }
            });
            setShowDevices(showDeviceArray);
            setNonShowDevices(nonShowDeviceArray);
        }
    }, [devices, devices.length]);

    const handleDeviceInput = (index, value) => {
        const newShowDevices = deepClone(showDevices);
        newShowDevices[index].count = parseInt(value);
        setShowDevices(newShowDevices);
    };

    const primaryDevices = showDevices.map((device, index) => {
        return (
            <Grid item lg={12} md={12} xs={12} key={index}>
                <CTextField
                    required={false}
                    type={"number"}
                    label={device.deviceName}
                    value={device.count}
                    InputProps={{ inputProps: { min: 0 } }}
                    onChange={(event) => handleDeviceInput(index, event.target.value)}
                />
            </Grid>
        );
    });

    const secondaryDevices = nonShowDevices.map((device, index) => (
        <MenuItem key={index} value={device}>
            {device.deviceName}
        </MenuItem>
    ));

    const handelSecondaryDeviceChange = (item) => {
        //remove item from list
        setNonShowDevices(nonShowDevices.filter((device) => device.deviceName !== item.deviceName));

        //add item to showDevices List
        setShowDevices((showDevices) => [...showDevices, item]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let orderDto = {
            departmentId: departmentId,
            contact: null,
            devices: showDevices.filter((device) => device.count > 0),
            senderFirstname: firstname,
            senderLastname: lastname,
            notes: notes !== "" ? notes : null,
        };

        if (departmentId === "NO_DEPARTMENT") {
            orderDto.departmentId = null;
            orderDto.contact = {
                gender: contactGender,
                firstname: contactFirstname,
                lastname: contactLastname,
                organisation: contactOrganisationName,
                mail: contactMail,
            };
        }

        console.log(orderDto);
        postOrderMutation.mutate(orderDto);
    };

    return (
        <DefaultPage>
            {departments.length === 0 && devices.length === 0 && (
                <Grid container>
                    {/*TODO show this in the middle of the screen*/}
                    <Grid item lg={12} md={12} xs={12} className={classes.grid}>
                        <CircularProgress />
                    </Grid>
                </Grid>
            )}

            {/*TODO show this in the middle of the screen*/}
            {departments.length !== 0 && devices.length !== 0 && (
                <ValidatorForm onSubmit={handleSubmit}>
                    <Grid container spacing={3} className={classes.form}>
                        <Grid item lg={12} md={12} xs={12}>
                            <h3>Hinweise:</h3>
                            <ul>
                                <li>
                                    Zu reinigende Schläuche, die keine Defekte aufweisen, bitte immer aufgerollt in das
                                    jeweilige Fahrregal
                                    <span className={classes.italic}>"Schläuche benutzt"</span> stellen.
                                </li>
                                <li>
                                    Defekte/beschädigte Schläuche bitte immer mit <b>einem Konten</b> versehen und den
                                    defekten Schlauch (wenn möglich gerollt) in die Box{" "}
                                    <span className={classes.italic}>"Schläuche defekt"</span> stellen.
                                </li>
                                <li>
                                    Saubere Schläuche bitte aus den Fahrregalen{" "}
                                    <span className={classes.italic}>"Schläuche sauber"</span> entnehmen. Dazu muss kein
                                    Formular ausgefüllt werden.
                                </li>
                            </ul>
                        </Grid>

                        <Grid item lg={12} md={12} xs={12}>
                            <CSelect
                                label={"Organisation auswählen"}
                                value={departmentId}
                                onChange={(event) => setDepartmentId(event.target.value)}
                                options={departmentSelection()}
                                validators={["required"]}
                                errorMessages={["Bitte wählen Sie eine Abteilung aus!"]}
                            />
                        </Grid>

                        {departmentId === "NO_DEPARTMENT" && (
                            <>
                                <Grid item md={12}>
                                    <Alert severity="info">
                                        Wenn Ihre Organisation nicht aufgelistet ist, hinterlegen Sie bitte einen{" "}
                                        <strong>Ansprechpartner</strong> zur Kontaktaufnahme.
                                    </Alert>
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <CSelect
                                        label={"Anrede"}
                                        defaultValue={[]}
                                        value={contactGender}
                                        onChange={(event) => setContactGender(event.target.value)}
                                        options={genderMenuItems}
                                        validators={["required"]}
                                        errorMessages={["Die Auswahl einer Anrede ist erforderlich!"]}
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <CTextField
                                        label={"Vorname"}
                                        value={contactFirstname}
                                        onChange={(event) => setContactFirstname(event.target.value)}
                                        validators={["required"]}
                                        errorMessages={["Die Eingabe eines Vornamen ist erforderlich!"]}
                                    />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <CTextField
                                        label={"Nachname"}
                                        value={contactLastname}
                                        onChange={(event) => setContactLastname(event.target.value)}
                                        validators={["required"]}
                                        errorMessages={["Die Eingabe eines Nachnamen ist erforderlich!"]}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <CTextField
                                        label={"Organisation"}
                                        value={contactOrganisationName}
                                        onChange={(event) => setContactOrganisationName(event.target.value)}
                                        validators={["required"]}
                                        errorMessages={["Die Eingabe einer Organisation ist erforderlich!"]}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <CTextField
                                        label={"E-Mail"}
                                        value={contactMail}
                                        onChange={(event) => setContactMail(event.target.value)}
                                        validators={["required", "isEmail"]}
                                        errorMessages={[
                                            "Die Eingabe einer E-Mail-Adresse ist erforderlich!",
                                            "Die Eingegebene E-Mail-Adresse ist nicht valide!",
                                        ]}
                                    />
                                </Grid>
                            </>
                        )}

                        <Grid item lg={12} md={12} xs={12}>
                            <CLine title={"Geräte"} />
                        </Grid>

                        {primaryDevices}

                        {nonShowDevices.length !== 0 && (
                            <Grid item lg={12} md={12} xs={12}>
                                <CSelect
                                    value={""}
                                    label={"Gerät hinzufügen"}
                                    onChange={(event) => handelSecondaryDeviceChange(event.target.value)}
                                    options={secondaryDevices}
                                />
                            </Grid>
                        )}

                        <Grid item lg={12} md={12} xs={12}>
                            <CTextField
                                required={false}
                                multiline
                                rows={4}
                                label={"Anmerkungen"}
                                value={notes}
                                onChange={(event) => setNotes(event.target.value)}
                            />
                        </Grid>

                        <Grid item lg={12} md={12} xs={12}>
                            <CLine title={"Absender"} />
                        </Grid>

                        <Grid item lg={6} md={6} xs={12}>
                            <CTextField
                                label={"Absender Vorname"}
                                value={firstname}
                                onChange={(event) => setFirstname(event.target.value)}
                                validators={["required"]}
                                errorMessages={"Bitte geben Sie einen Vorname an!"}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} xs={12}>
                            <CTextField
                                label={"Absender Nachname"}
                                value={lastname}
                                onChange={(event) => setLastname(event.target.value)}
                                validators={["required"]}
                                errorMessages={"Bitte geben Sie einen Nachnamen an!"}
                            />
                        </Grid>

                        {/*TODO align Item right*/}
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                type={"submit"}
                                className={classes.submitButton}
                            >
                                Absenden
                            </Button>
                        </Grid>
                    </Grid>

                    {/*<Grid container justify="flex-end">
                            <Grid item>
                                <Button variant="contained" color="primary" type={"submit"}
                                        className={classes.submitButton}>Absenden</Button>
                            </Grid>
                        </Grid>*/}
                </ValidatorForm>
            )}
        </DefaultPage>
    );
};

export default OrderForm;
