import {makeStyles} from "@material-ui/core/styles";
import React, {useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from "@material-ui/core/IconButton";
import {DataGrid, GridToolbarContainer, GridToolbarExport} from '@mui/x-data-grid';
import {Checkbox} from "@material-ui/core";
import {gridLocale} from "../../i118/GridLocale";
import dayjs from "dayjs";
import {Chip} from "@mui/material";
import {DELIVERY_DETAILS} from "../../router/navigationPaths";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    dataGrid: {
        height: 720,
        width: "100%"
    },
    dataGridRemoveBorder: {
        border: "none !important",
    }
}));


const DeliveriesDataGrid = ( { deliveries = [], } ) => {

    const navigate = useNavigate();
    const classes = useStyles();
    const [selectedDelivery, setSelectedDelivery] = useState( {} );
    console.log( selectedDelivery );

    const buttons = [{
        key: 1,
        labelText: "Details",
            icon: <SearchIcon/>,
            onClick: () => {
                navigate(DELIVERY_DETAILS.path.replace(":id", selectedDelivery.id), {
                    state: {
                        delivery: selectedDelivery
                    }
                })
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

    const checkboxRender = (params) => {
        let checked = params.value.length > 0
        return (
            <Checkbox
                checked={checked}
                disabled={true}
                color="primary"
            />
        )
    }

    const dateRender = (params) => {
        return dayjs(params.value).format("DD/MM/YYYY HH:mm")
    }

    const deliveredFromRender = (params) => {
        const delivery = params.row
        if (delivery.department !== null) {
            return delivery.department.department
        }
        if (delivery.contact !== null) {
            return delivery.contact.company
        }
    }

    const statusRender = (params) => {
        const delivery = params.value
        if (delivery === null) {
            return (<Chip label="Nicht registriert" color="error"/>)
        }
        return (<Chip label="Registriert" color="success"/>)
    }

    const columns = [
        {field: "orderId", headerName: "Auftragsnummer", flex: true},
        {headerName: "Abgegeben von", renderCell: deliveredFromRender, flex: true},
        {field: "department", headerName: "Status", renderCell: statusRender, flex: true},
        {field: "notes", headerName: "Bemerkungen", renderCell: checkboxRender, flex: true},
        {field: "createdAt", headerName: "Abgabedatum", renderCell: dateRender, flex: true},
        {field: "", headerName: "Aktionen", renderCell: buttonHandler, width: 140},
    ]

    //TODO format Abgabedatum

    function CustomToolbar() {
        return (
            <GridToolbarContainer className={"grid-toolbar-container"}>
                <GridToolbarExport/>
            </GridToolbarContainer>
        )
    }

    return (
        <div className={classes.dataGrid}>
            <DataGrid
                rows={deliveries}
                columns={columns}
                pageSize={10}
                loading={deliveries.length === 0}
                onRowClick={(item) => setSelectedDelivery(item.row)}
                localeText={gridLocale}
                components={{Toolbar: CustomToolbar}}
                className={classes.dataGridRemoveBorder}
            />
        </div>
    );
}

export default DeliveriesDataGrid;