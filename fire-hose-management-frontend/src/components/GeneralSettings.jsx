import React from "react";
import {Button} from "@material-ui/core";
import DefaultPage from "./shared/DefaultPage";

const GeneralSettings = () => {
    return (<DefaultPage>
        <h1>Dashboard</h1>
        <Button variant="contained" onClick={() => console.log( "TEST" )}>
            Default
        </Button>
    </DefaultPage>);
};

export default GeneralSettings;
