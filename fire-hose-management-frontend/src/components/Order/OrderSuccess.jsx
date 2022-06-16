import { Button, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ORDER_FORM } from "../../router/navigationPaths";
import DefaultPage from "../shared/DefaultPage";

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
}));

const OrderSuccess = () => {
  const classes = useStyles();

  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state.order;

  const handleBtnClick = () => {
    navigate(ORDER_FORM.path);
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
          {order === undefined && (
            <Grid item>
              <h3>Kein Auftrag vorhanden!</h3>
            </Grid>
          )}

          {order !== undefined && (
            <Grid item>
              <h3>Auftrag erfolgreich:</h3>
              <p>
                Der Auftrag mit der <b>Auftragsnummer: {order.orderId}</b> wurde erfolgreich übermittelt!
              </p>
              <p>Vielen Dank!</p>
            </Grid>
          )}

          <Button variant="contained" color="primary" onClick={() => handleBtnClick()}>
            Neuen Auftrag erstellen
          </Button>
        </Grid>
      </div>
    </DefaultPage>
  );
};

export default OrderSuccess;
