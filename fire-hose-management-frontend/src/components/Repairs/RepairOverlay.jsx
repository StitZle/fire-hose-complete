import Stack from "@mui/material/Stack";
import {Button, CircularProgress, makeStyles} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {Overlay} from "../shared/Overlay";
import Typography from "@material-ui/core/Typography";
import {useAuth0} from "@auth0/auth0-react";
import {useGetAllDevices} from "../../hooks/useGetAllDevices";
import {Grid} from "@mui/material";
import {CTextField} from "../shared/input/CTextField";
import deepClone from "deep-clone";
import {ValidatorForm} from 'react-material-ui-form-validator';


const useStyles = makeStyles((theme) => ({
    italic: {
        fontStyle: "italic"
    },
    grid: {
        textAlign: "center",

    },
    submitButton: {
        marginTop: 20,
    },
}));

export const RepairOverlay = ({
                                  handleClose,
                                  submitBtnFunction
                              }) => {

    const {user} = useAuth0();
    const classes = useStyles();
    const {devices} = useGetAllDevices();


    const [showDevices, setShowDevices] = useState([])

    useEffect(() => {

        setShowDevices(devices)
    }, [devices]);

    console.log("DEVICES", devices)
    console.log("STATE", showDevices)

    const handleDeviceInput = (index, value) => {
        const newShowDevices = deepClone(showDevices)
        newShowDevices[index].count = value
        setShowDevices(newShowDevices)
    }

    const buildInputs = showDevices.map((device, index) => {
        return (
            <Grid item lg={12} md={12} xs={12} key={index}>
                <CTextField
                    required={false}
                    type={"number"}
                    label={device.deviceName}
                    value={0}
                    InputProps={{inputProps: {min: 0}}}
                    onChange={(event) => handleDeviceInput(index, event.target.value)}
                />
            </Grid>
        )
    })

    console.log("INPUTS", buildInputs)

    const footerContent = (
        <Stack spacing={2} direction="row">
            <Button color="primary" variant="contained" type="submit"
                    onClick={() => submitBtnFunction()}>Bestätigen</Button>
            <Button color="primary" variant="outlined" onClick={() => handleClose()}>Abbrechen</Button>
        </Stack>
    );

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <Overlay
            onClose={() => handleClose()}
            headerContent={<h2>Neue Repeater hinzufügen</h2>}
            footerContent={footerContent}
            size={"s"}>


            {devices.length === 0 &&
                <Grid container>
                    {/*TODO show this in the middle of the screen*/}
                    <Grid item lg={12} md={12} xs={12} className={classes.grid}>
                        <CircularProgress/>
                    </Grid>
                </Grid>
            }


            {devices.length !== 0 &&

                <ValidatorForm onSubmit={handleSubmit}>
                    <Typography variant={"body2"}>
                        Der Reparaturauftrag wird auf folgenden Benutzer gebucht: <Typography
                        variant={"body1"}>{user.name}</Typography>
                    </Typography>

                    {buildInputs}
                </ValidatorForm>
            }


        </Overlay>
    );

}