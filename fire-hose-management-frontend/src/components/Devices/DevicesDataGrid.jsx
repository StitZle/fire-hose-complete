import { DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { gridLocale } from "../../i118/GridLocale";
import React from "react";
import { Button, Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useGetAllDevices } from "../../hooks/useGetAllDevices";

const useStyles = makeStyles((theme) => ({
    dataGrid: {
        height: 720,
        width: "100%",
    },
    dataGridRemoveBorder: {
        border: "none !important",
    },
}));

const DevicesDataGrid = ({
    selectedDeviceFunction,
    setDeleteOverlayVisibleFunction,
    setIsEditOverlayVisibleFunction,
    setIsAddOverlayVisibleFunction,
}) => {
    const classes = useStyles();

    const { devices } = useGetAllDevices();

    const editDevice = React.useCallback(
        (row) => () => {
            selectedDeviceFunction(row);
            setIsEditOverlayVisibleFunction(true);
        },
        [selectedDeviceFunction, setIsEditOverlayVisibleFunction]
    );

    const deleteDevice = React.useCallback(
        (row) => () => {
            selectedDeviceFunction(row);
            setDeleteOverlayVisibleFunction(true);
        },
        [selectedDeviceFunction, setDeleteOverlayVisibleFunction]
    );

    const checkboxRender = (params) => {
        return <Checkbox checked={params.value} disabled={true} color="primary" />;
    };

    const columns = React.useMemo(
        () => [
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
                field: "isPrimary",
                headerName: "Primäres Gerät",
                renderCell: checkboxRender,
                flex: true,
            },
            {
                field: "actions",
                type: "actions",
                width: 140,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Gerät löschen"
                        onClick={deleteDevice(params.row)}
                    />,
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Geräte bearbeiten"
                        onClick={editDevice(params.row)}
                    />,
                ],
            },
        ],
        [deleteDevice, editDevice]
    );

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer className={"grid-toolbar-container"}>
                <Button variant="contained" color="primary" onClick={() => setIsAddOverlayVisibleFunction(true)}>
                    Gerät hinzufügen
                </Button>
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    };

    return (
        <div className={classes.dataGrid}>
            <DataGrid
                rows={devices}
                columns={columns}
                loading={devices.length === 0}
                pageSize={10}
                localeText={gridLocale}
                components={{ Toolbar: CustomToolbar }}
                className={classes.dataGridRemoveBorder}
            />
        </div>
    );
};

export default DevicesDataGrid;
