import {DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarExport} from "@mui/x-data-grid";
import {gridLocale} from "../../i118/GridLocale";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useGetAllDepartments} from "../../hooks/useGetAllDepartments";

const useStyles = makeStyles( ( theme ) => ({
    dataGrid: {
        height: 720,
        width: "100%",
    },
    dataGridRemoveBorder: {
        border: "none !important",
    },
}) );

export const DepartmentsDataGrid = ( {
                                         selectedDepartmentFunction,
                                         setDeleteOverlayVisibleFunction,
                                         setIsEditOverlayVisibleFunction,
                                         setIsAddOverlayVisibleFunction,
                                     } ) => {
    const classes = useStyles();

    const { departments } = useGetAllDepartments();

    const getFullName = ( params ) => {
        return `${params.row.contact.firstname} ${params.row.contact.lastname}`;
    };

    const getStreetAddress = ( params ) => {
        return `${params.row.street} ${params.row.houseNumber}`;
    };

    const getMail = ( params ) => {
        return params.row.contact.mail;
    };

    const editDepartment = React.useCallback( ( row ) => () => {
        selectedDepartmentFunction( row );
        setIsEditOverlayVisibleFunction( true );
    }, [selectedDepartmentFunction, setIsEditOverlayVisibleFunction] );

    const deleteDepartment = React.useCallback( ( row ) => () => {
        selectedDepartmentFunction( row );
        setDeleteOverlayVisibleFunction( true );
    }, [selectedDepartmentFunction, setDeleteOverlayVisibleFunction] );

    const columns = React.useMemo( () => [{
        field: "departmentName",
        headerName: "Abteilung",
        flex: true
    }, {
        field: "address",
        headerName: "Adresse",
        flex: true,
        valueGetter: getStreetAddress
    }, {
        field: "postalCode",
        headerName: "PLZ",
        flex: true
    }, {
        field: "location",
        headerName: "Ort",
        flex: true
    }, {
        field: "country",
        headerName: "Land",
        flex: true
    }, {
        field: "contact",
        headerName: "Ansprechpartner",
        flex: true,
        valueGetter: getFullName
    }, {
        field: "mail",
        headerName: "E-Mail",
        flex: true,
        valueGetter: getMail
    }, {
        field: "actions",
        type: "actions",
        width: 140,
        getActions: ( params ) => [<GridActionsCellItem
                icon={<DeleteIcon/>}
                label="Abteilung löschen"
                onClick={deleteDepartment( params.row )}
        />, <GridActionsCellItem
                icon={<EditIcon/>}
                label="Abteilung bearbeiten"
                onClick={editDepartment( params.row )}
        />,],
    },], [deleteDepartment, editDepartment] );

    function CustomToolbar() {
        return (<GridToolbarContainer className={"grid-toolbar-container"}>
            <Button variant="contained" color="primary" onClick={() => setIsAddOverlayVisibleFunction( true )}>
                Abteilung hinzufügen
            </Button>
            <GridToolbarExport/>
        </GridToolbarContainer>);
    }

    return (<div className={classes.dataGrid}>
        <DataGrid
                getRowId={( row ) => row.id}
                rows={departments}
                columns={columns}
                pageSize={10}
                loading={departments.length === 0}
                localeText={gridLocale}
                components={{ Toolbar: CustomToolbar }}
                className={classes.dataGridRemoveBorder}
        />
    </div>);
};
