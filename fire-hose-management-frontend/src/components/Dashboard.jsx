import React from 'react';
import {Button} from "@material-ui/core";
import * as countries from "i18n-iso-countries";
import DefaultPage from "./shared/DefaultPage";

const Dashboard = () => {

    const countiesHandle = () => {
        countries.registerLocale(require("i18n-iso-countries/langs/de.json"));
        console.log(countries.getNames("de", {select: "official"}))
    }

    return (
        <DefaultPage>
            <h1>Dashboard</h1>
            <Button variant="contained" onClick={() => countiesHandle()}>Default</Button>
        </DefaultPage>

    );
}

export default Dashboard;