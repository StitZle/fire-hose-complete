import { Button, Grid, makeStyles } from "@material-ui/core";
import DefaultPage from "../shared/DefaultPage";
import React from "react";
import Typography from "@mui/material/Typography";
import { Card, CardContent, CssBaseline, Paper } from "@mui/material";
import Notifications from "../shared/Notifications";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  container: {
    minHeight: "100vh",
    textAlign: "center",
  },
  card: {
    marginTop: "24px",
  },
}));

const ExportData = () => {
  const classes = useStyles();

  const showErrorForRepairs = () => {
    Notifications.showError("Der Export ist fehlgeschlagen!");
  };

  return (
    <DefaultPage>
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center"
          justifyContent="center"
          className={classes.container}
        >
          <Grid container spacing={2}>
            <Grid item md={3}></Grid>
            <Grid item md={3}>
              <Paper elevation={2}>
                <Card>
                  <CardContent>
                    <Typography variant={"h6"}>Abgaben exportieren</Typography>

                    <Typography variant={"body2"} className={classes.card}>
                      Hier können die Abgaben der einzelnen Organisationen exportiert werden. Alle Abgaben werden pro
                      Organisation aggregiert und kumuliert. Die Daten werden in einer CSV-Datei bereitgestellt.
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.card}
                      onClick={() => showErrorForRepairs()}
                    >
                      Export erstellen
                    </Button>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
            <Grid item md={3}>
              <Paper elevation={2}>
                <Card>
                  <CardContent>
                    <Typography variant={"h6"}>Reparaturen exportieren</Typography>

                    <Typography variant={"body2"} className={classes.card}>
                      Hier können die Reparaturen für jeden Gerätewart exportiert werden. Alle Reparaturen und
                      Waschaufträge werden pro Gerätewart aggregiert und kumuliert. Die Daten werden in einer CSV-Datei
                      bereitgestellt.
                    </Typography>
                    <CssBaseline />
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.card}
                      onClick={() => showErrorForRepairs()}
                    >
                      Export erstellen
                    </Button>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
            <Grid item md={3}></Grid>
          </Grid>
        </Grid>
      </div>
    </DefaultPage>
  );
};
export default ExportData;
