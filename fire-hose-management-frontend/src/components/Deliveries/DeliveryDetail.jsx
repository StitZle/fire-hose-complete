import DefaultPage from "../shared/DefaultPage";
import React from "react";
import {useLocation} from "react-router-dom";
import Sender from "./Sender";
import Info from "./Info";
import {Grid} from "@mui/material";
import Notes from "./Notes";
import Devices from "./Devices";

const DeliveryDetail = () => {
    const location = useLocation();
    const delivery = location.state.delivery;

    //TODO get single Delivery
    //TODO fix page Reload

    return (<DefaultPage>
        <h1>Detailübersicht für Abgabe: {delivery.orderId}</h1>
        <Grid container spacing={2}>
            <Grid item xs={6} md={8}>
                <Sender delivery={delivery}/>
            </Grid>
            <Grid item xs={6} md={4}>
                <Info delivery={delivery}/>
            </Grid>
            <Grid item xs={6} md={8}>
                <Devices delivery={delivery}/>
            </Grid>
            <Grid item xs={6} md={4}>
                <Notes delivery={delivery}/>
            </Grid>
        </Grid>
    </DefaultPage>);
};
export default DeliveryDetail;
