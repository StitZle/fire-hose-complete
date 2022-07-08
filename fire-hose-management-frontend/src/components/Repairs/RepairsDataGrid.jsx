import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { gridLocale } from "../../i118/GridLocale";
import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import dayjs from "dayjs";

const useStyles = makeStyles((theme) => ({
    dataGrid: {
        height: 720,
        width: "100%",
    },
    dataGridRemoveBorder: {
        border: "none !important",
    },
}));

const RepairsDataGrid = ({ repairs = [], setIsAddOverlayVisibleFunction }) => {
    const classes = useStyles();

    const dateRender = (params) => {
        return dayjs(params.value).format("DD/MM/YYYY HH:mm");
    };

    const deviceNameRender = (params) => {
        let devices = [];
        params.row.maintenanceDevices.forEach((device) => {
            devices.push(device.deviceName);
        });
        return devices.join(", ");
    };

    const maintainedCount = (params) => {
        let count = 0;
        params.row.maintenanceDevices.forEach((device) => {
            count = count + device.maintained;
        });
        return count;
    };

    const discardedCount = (params) => {
        let count = 0;
        params.row.maintenanceDevices.forEach((device) => {
            count = count + device.discarded;
        });
        return count;
    };

    const columns: GridColDef = [
        {
            field: "createdAt",
            headerName: "Durchführungsdatum",
            renderCell: dateRender,
            flex: true,
        },
        {
            field: "username",
            headerName: "Durchgeführt von",
            flex: true,
        },
        {
            field: "deviceCount",
            headerName: "Gewartete Geräte",
            valueGetter: deviceNameRender,
            flex: true,
        },
        {
            field: "maintainedCount",
            headerName: "Anzahl gewartete Geräte",
            valueGetter: maintainedCount,
            flex: true,
        },
        {
            field: "discardedCount",
            headerName: "Anzahl entsorgter Geräte",
            valueGetter: discardedCount,
            flex: true,
        },
    ];

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer className={"grid-toolbar-container"}>
                <Button variant="contained" color="primary" onClick={() => setIsAddOverlayVisibleFunction()}>
                    Wartung hinzufügen
                </Button>

                <GridToolbarExport />
            </GridToolbarContainer>
        );
    };

    return (
        <div className={classes.dataGrid}>
            <DataGrid
                disableColumnMenu={true}
                rows={repairs}
                columns={columns}
                pageSize={10}
                loading={repairs.length === 0}
                localeText={gridLocale}
                components={{ Toolbar: CustomToolbar }}
                className={classes.dataGridRemoveBorder}
            />
        </div>
    );
};

export default RepairsDataGrid;
