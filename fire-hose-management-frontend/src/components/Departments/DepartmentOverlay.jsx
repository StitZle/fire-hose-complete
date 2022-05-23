import * as i18nIsoCountries from "i18n-iso-countries";
import React, {useState} from "react";
import Stack from "@mui/material/Stack";
import {Button, Checkbox, FormControlLabel, Grid, MenuItem} from "@material-ui/core";
import {CTextField} from "../shared/input/CTextField";
import {CSelect} from "../shared/input/CSelect";
import {ValidatorForm} from "react-material-ui-form-validator";
import {Overlay} from "../shared/Overlay";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    checkbox: {
        display: "table-cell",
        verticalAlign: "middle"
    },
    footer: {
        paddingTop: "24px",
        paddingBottom: "32px"
    }
}));


i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/de.json"));

const countries = Object.values(i18nIsoCountries.getNames("de", {select: "official"})).map((country, index) =>
    <MenuItem key={index} value={country}>{country}</MenuItem>)

const genderMenuItems = [
    <MenuItem key={0} value={"MALE"}>Männlich</MenuItem>,
    <MenuItem key={1} value={"FEMALE"}>Weiblich</MenuItem>,
    <MenuItem key={2} value={"OTHER"}>Divers</MenuItem>
]


export const DepartmentOverlay = ({
                                      handleClose,
                                      headline,
                                      submitBtnText,
                                      submitBtnFunction,
                                      initialDepartmentName = "",
                                      initialStreet = "",
                                      initialHouseNumber = "",
                                      initialPostalCode = "",
                                      initialLocation = "",
                                      initialCountry = "Deutschland",
                                      initialGender = "",
                                      initialFirstname = "",
                                      initialLastname = "",
                                      initialMail = "",
                                      initialSendConfirmationMail = true
                                  }) => {

    const classes = useStyles();
    const [departmentName, setDepartmentName] = useState(initialDepartmentName)
    const [street, setStreet] = useState(initialStreet)
    const [houseNumber, setHouseNumber] = useState(initialHouseNumber)
    const [postalCode, setPostalCode] = useState(initialPostalCode)
    const [location, setLocation] = useState(initialLocation)
    const [country, setCountry] = useState(initialCountry)
    const [gender, setGender] = useState(initialGender)
    const [firstname, setFirstname] = useState(initialFirstname)
    const [lastname, setLastname] = useState(initialLastname)
    const [mail, setMail] = useState(initialMail)
    const [sendConfirmationMail, setSendConformationMail] = useState(initialSendConfirmationMail)

    const dtoBuilder = (departmentName, street, houseNumber, postalCode, location, country, firstname, lastname, mail, sendConfirmationMail) => {
        return {
            departmentName: departmentName,
            contact: {
                gender: gender,
                firstname: firstname,
                lastname: lastname,
                mail: mail,
            },
            street: street,
            houseNumber: houseNumber,
            postalCode: postalCode,
            location: location,
            country: country,
            sendConfirmationMail: sendConfirmationMail
        }
    }


    return (<Overlay
        onClose={() => handleClose()}
        headerContent={<h2>{headline}</h2>}
        size={"m"}>
        <ValidatorForm
            onSubmit={() => submitBtnFunction(dtoBuilder(departmentName, street, houseNumber, postalCode, location, country, firstname, lastname, mail, sendConfirmationMail))}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <CTextField
                        hasAutofocus={true}
                        label={"Abteilung"}
                        value={departmentName}
                        onChange={(event) => setDepartmentName(event.target.value)}
                        validators={["required"]}
                        errorMessages={["Die Eingabe einer Abteilung ist erforderlich!"]}
                    />
                </Grid>
                <Grid item md={6}>
                    <CTextField
                        label={"Straße"}
                        value={street}
                        onChange={(event) => setStreet(event.target.value)}
                        validators={["required"]}
                        errorMessages={["Die Eingabe eines Straßennamens ist erforderlich!"]}
                    />
                </Grid>
                <Grid item md={6}>
                    <CTextField
                        label={"Hausnummer"}
                        value={houseNumber}
                        onChange={(event) => setHouseNumber(event.target.value)}
                        validators={["required"]}
                        errorMessages={["Die Eingabe einer Hausnummer ist erforderlich!"]}
                    />
                </Grid>
                <Grid item md={4}>
                    <CTextField
                        label={"PLZ"}
                        value={postalCode}
                        onChange={(event) => setPostalCode(event.target.value)}
                        validators={["required"]}
                        errorMessages={["Die Eingabe einer Postleitzahl ist erforderlich!"]}
                    />
                </Grid>
                <Grid item md={4}>
                    <CTextField
                        label={"Ort"}
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        validators={["required"]}
                        errorMessages={["Die Eingabe eines Ortes ist erforderlich!"]}
                    />
                </Grid>
                <Grid item md={4}>
                    <CSelect
                        label={"Land"}
                        defaultValue={[]}
                        value={country}
                        onChange={(event) => setCountry(event.target.value)}
                        options={countries}
                        validators={["required"]}
                        errorMessages={["Die Auswahl eines Landes ist erforderlich!"]}
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
                        errorMessages={["Die Eingabe einer E-Mail-Adresse ist erforderlich!", "Die Eingegebene E-Mail-Adresse ist nicht valide!"]}
                    />
                </Grid>
                <Grid item md={6}>
                    <FormControlLabel
                        control={<Checkbox
                            className={classes.checkbox}
                            checked={sendConfirmationMail}
                            onChange={() => setSendConformationMail(!sendConfirmationMail)}
                            color="primary"
                        />}
                        label="Bestätigungsmail versenden?"
                    />
                </Grid>
            </Grid>
            <Stack spacing={2} direction="row" className={classes.footer}>
                <Button color="primary" variant="contained" type="submit">{submitBtnText}</Button>
                <Button color="primary" variant="outlined" onClick={() => handleClose()}>Abbrechen</Button>
            </Stack>
        </ValidatorForm>

    </Overlay>);

}