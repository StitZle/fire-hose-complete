import React, { useEffect, useState } from "react";
import DefaultPage from "../shared/DefaultPage";
import { Card, CardContent, Grid, Paper, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useGetAllNewMaintenanceDevices } from "../../hooks/useGetAllNewMaintenanceDevices";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, CircularProgress } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import { useMutation } from "react-query";
import Notifications from "../shared/Notifications";
import { addDeviceMaintenance } from "../../utils/requests/MaintenanceDevices";
import { makeStyles } from "@material-ui/core/styles";
import { REPAIRS } from "../../router/navigationPaths";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  buttonFooter: {
    marginTop: "24px",
    marginBottom: "32px",
  },
}));

const AddRepair = () => {
  const { user } = useAuth0();
  const navigate = useNavigate();

  const classes = useStyles();
  const [devices, setDevices] = useState([]);
  const [noteForm, setFormNote] = useState("");
  const { maintenanceDevices } = useGetAllNewMaintenanceDevices();

  useEffect(() => {
    setDevices(maintenanceDevices);
  }, [maintenanceDevices]);

  const addMaintenanceDevices = useMutation((dto) => addDeviceMaintenance(dto), {
    onSuccess: () => {
      Notifications.showSuccess("Die Gerätewartung wurde erfolgreich hinterlegt!");
      navigate(REPAIRS.path, { replace: true });
    },
    onError: (error) => {
      Notifications.showError("Fehler beim hinterlegen der Gerätewartung!");
      console.log(error);
    },
  });

  const postDeviceMaintenance = () => {
    const filteredDevices = devices.filter((device) => device.maintained + device.discarded > 0);
    if (filteredDevices.length === 0) {
      Notifications.showError("die Anzahl der gewarteten Geräte muss größer als 0 sein!");
      return;
    }
    const dto = {
      username: user.name,
      userId: user.sub,
      notes: "",
      maintenanceDevices: filteredDevices,
    };
    addMaintenanceDevices.mutate(dto);
  };

  const handleFormChangeMaintained = (index, event) => {
    let data = [...maintenanceDevices];
    data[index].maintained = parseInt(event.target.value);
    setDevices(data);
  };

  const handleFormChangeDiscarded = (index, event) => {
    let data = [...maintenanceDevices];
    data[index].discarded = parseInt(event.target.value);
    setDevices(data);
  };

  const buildInputs = devices.map((device, index) => {
    return (
      <Grid item lg={4} xl={3} key={index}>
        <Paper elevation={2}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant={"h6"}>
                {device.deviceName}
              </Typography>

              <Grid container spacing={2}>
                <Grid item sm={6} md={6}>
                  <TextField
                    type="number"
                    variant="filled"
                    fullWidth
                    label={"Gewaschen und Repariert"}
                    value={device.maintained}
                    InputProps={{
                      inputProps: {
                        min: 0,
                        max: 100,
                      },
                    }}
                    onChange={(event) => handleFormChangeMaintained(index, event)}
                  />
                </Grid>
                <Grid item sm={6} md={6}>
                  <TextField
                    type="number"
                    variant="filled"
                    fullWidth
                    label="Ausgesondert"
                    value={device.discarded}
                    InputProps={{
                      inputProps: {
                        min: 0,
                        max: 100,
                      },
                    }}
                    onChange={(event) => handleFormChangeDiscarded(index, event)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    );
  });

  return (
    <DefaultPage>
      <h1>Neue Gerätewartung hinzufügen</h1>

      {maintenanceDevices.length === 0 && (
        <Grid container>
          <Typography>
            Es wurden keine Geräte hinterlegt. Geräte können unter dem Reiter "Geräteübersicht" hinterlegt werden.
          </Typography>

          {/*TODO show this in the middle of the screen*/}
          <Grid item lg={12} md={12} xs={12} className={classes.grid}>
            <CircularProgress />
          </Grid>
        </Grid>
      )}

      {maintenanceDevices.length !== 0 && (
        <>
          <Typography className={classes.buttonFooter}>
            Anbei können Daten für die Gerätewartung hinterlegt werden.
          </Typography>

          <Typography className={classes.buttonFooter}>
            Die vorgenommene Wartung wird für den Benutzer: <b>{user.name}</b> hinterlegt.
          </Typography>

          {/*<TextField className={classes.buttonFooter}
                   label="Bemerkungen"
                   multiline
                   variant="filled"
                   minRows={4}
                   value={noteForm}
                onChange={( event ) => setFormNote( event.target.value )}
        />*/}

          <Grid container spacing={3}>
            {buildInputs}
          </Grid>

          <Stack spacing={2} direction="row" className={classes.buttonFooter}>
            <Button color="primary" variant="contained" onClick={() => postDeviceMaintenance()}>
              Gerätewartung hinterlegen
            </Button>
            <Button color="primary" variant="outlined" onClick={() => navigate(REPAIRS.path, { replace: true })}>
              Abbrechen
            </Button>
          </Stack>
        </>
      )}
    </DefaultPage>
  );
};

export default AddRepair;
