import { Card, CardContent, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { gridLocale } from "../../i118/GridLocale";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    dataGrid: {
        minHeight: 400,
        width: "100%",
        flexGrow: 1,
    },
    dataGridRemoveBorder: {
        border: "none !important",
    },
}));

const Devices = ({ delivery }) => {
    const classes = useStyles();
    const devices = delivery.devices;

    const columns = [
        {
            field: "deviceName",
            headerName: "Gerätename",
            flex: true,
        },
        {
            field: "deviceId",
            headerName: "Kennung",
            flex: true,
        },
        {
            field: "count",
            headerName: "Anzahl",
            flex: true,
        },
    ];

    return (
        <Paper elevation={2}>
            <Card>
                <CardContent>
                    <Typography variant={"h6"}>Abgegebene Geräte:</Typography>
                    <DataGrid
                        autoHeight
                        rows={devices}
                        columns={columns}
                        localeText={gridLocale}
                        className={classes.dataGridRemoveBorder}
                    />
                </CardContent>
            </Card>
        </Paper>
    );
};

export default Devices;
