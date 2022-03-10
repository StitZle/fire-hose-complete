import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from "@material-ui/core/IconButton";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import {Button} from "@material-ui/core";
import {gridLocale} from "../../i118/GridLocale";

const useStyles = makeStyles((theme) => ({
    dataGrid: {
        height: 720,
        width: "100%"
    },
    dataGridRemoveBorder: {
        border: "none !important",
    }
}));


const DeliveriesDataGrid = ({
                                deliveries = [],
                                setDetailsOverlayVisibleFunction,
                                selectedDeliveryFunction
                            }) => {
    const classes = useStyles();

    const buttons = [
        {
            key: 1,
            labelText: "Details",
            icon: <SearchIcon/>,
            onClick: () => {
                setDetailsOverlayVisibleFunction(true)
            }
        }]


    const buttonHandler = (props) => {
        if (props) {
            return (
                <div>
                    {
                        buttons.map((btn) => {
                            return (
                                <IconButton
                                    aria-label={btn.labelText}
                                    onClick={(value) => {
                                        btn.onClick(value)
                                    }}>
                                    {btn.icon}
                                </IconButton>
                            )

                        })
                    }
                </div>
            )
        }
    }

    const columns = [
        {field: "orderId", headerName: "Auftragsnummer", flex: true},
        {field: "department.department", headerName: "Abteilung", flex: true},
        {field: "notes", headerName: "Bemerkungen", flex: true},
        {field: "createdAt", headerName: "Abgabedatum", flex: true},
        {field: "", headerName: "Aktionen", renderCell: buttonHandler, width: 140},
    ]

    function CustomToolbar() {
        return (
            <GridToolbarContainer className={"grid-toolbar-container"}>
                <Button variant="contained" color="primary" onClick={() => selectedDeliveryFunction(true)}>Abteilung
                    hinzufügen</Button>

                <GridToolbarExport/>
            </GridToolbarContainer>
        )
    }

    return (
        <div className={classes.dataGrid}>
            <DataGrid
                getRowId={(row) => row.orderId}
                disableColumnMenu={false}
                rows={deliveries}
                columns={columns}
                pageSize={10}
                loading={deliveries.length === 0}
                onRowClick={(item) => selectedDeliveryFunction(item.row)}
                localeText={gridLocale}
                components={{Toolbar: CustomToolbar}}
                className={classes.dataGridRemoveBorder}
            />
        </div>
    );
}

export default DeliveriesDataGrid;