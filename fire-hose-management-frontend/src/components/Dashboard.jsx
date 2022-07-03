import React from "react";
import DefaultPage from "./shared/DefaultPage";
import Typography from "@mui/material/Typography";
import {useAuth0} from "@auth0/auth0-react";

const Dashboard = () => {
    //https://stackoverflow.com/questions/54060096/close-persistent-mui-drawer-on-clicking-outside
    const { isAuthenticated } = useAuth0();

    return (<DefaultPage>
        <h1>Dashboard</h1>
        {!isAuthenticated && <Typography variant={"h6"}>Bitte loggen Sie sich ein um Daten zu sehen!</Typography>}
        {isAuthenticated && <Typography variant={"h6"}>Erfolgreich eingeloggt!</Typography>}
    </DefaultPage>);
};

export default Dashboard;
