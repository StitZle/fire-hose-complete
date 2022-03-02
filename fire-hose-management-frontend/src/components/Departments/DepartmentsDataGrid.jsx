import {
  DataGrid,
  GridColumnsToolbarButton,
  GridFilterToolbarButton,
  GridToolbarContainer, GridToolbarExport
} from "@material-ui/data-grid";
import { gridLocale } from "../../i118/GridLocale";
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles( ( theme ) => ({
  dataGrid: {
    height: 720,
    width: "100%"
  },
  dataGridRemoveBorder: {
    border: "none !important",
  }
}) );


export const DepartmentsDataGrid = ( {
                                   departments = [],
                                   selectedDepartmentFunction,
                                   setDeleteOverlayVisibleFunction,
                                   setIsEditOverlayVisibleFunction,
                                   setIsAddOverlayVisibleFunction

                                 } ) => {
  const classes = useStyles();

  const buttons = [
    {
      key: 1,
      labelText: "Abteilung löschen",
      icon: <DeleteIcon/>,
      onClick: () => {
        setDeleteOverlayVisibleFunction( true )
      }
    }, {
      key: 1,
      labelText: "Abteilung bearbeiten",
      icon: <EditIcon/>,
      onClick: () => {
        setIsEditOverlayVisibleFunction( true )
      }
    }]


  const buttonHandler = ( props ) => {
    if( props ) {
      return (
        <div>
          {
            buttons.map( ( btn ) => {
              return (
                <IconButton
                  aria-label={btn.labelText}
                  onClick={( value ) => {
                    btn.onClick( value )
                  }}>
                  {btn.icon}
                </IconButton>
              )

            } )
          }
        </div>
      )
    }
  }


  const columns = [
    {field: "department", headerName: "Abteilung", flex: true},
    {field: "street", headerName: "Straße", flex: true},
    {field: "houseNumber", headerName: "Hausnummer", flex: true},
    {field: "postalCode", headerName: "PLZ", flex: true},
    {field: "location", headerName: "Ort", flex: true},
    {field: "country", headerName: "Land", flex: true},
    {field: "forename", headerName: "Vorname", flex: true},
    {field: "surname", headerName: "Nachname", flex: true},
    {field: "mail", headerName: "E-Mail", flex: true},
    {field: "", headerName: "Aktionen", renderCell: buttonHandler, width: 140},
  ]

  function CustomToolbar() {
    return (
      <GridToolbarContainer className={"grid-toolbar-container"}>
        <Button variant="contained" color="primary" onClick={() => setIsAddOverlayVisibleFunction(true)}>Abteilung
          hinzufügen</Button>
        <GridColumnsToolbarButton/>
        <GridFilterToolbarButton/>
        <GridToolbarExport/>
      </GridToolbarContainer>
    )
  }


  return (
    <div className={classes.dataGrid}>
      <DataGrid
        disableColumnMenu={true}
        rows={departments}
        columns={columns}
        pageSize={10}
        loading={departments.length === 0}
        onRowSelected={( row ) => selectedDepartmentFunction( row.data )}
        localeText={gridLocale}
        components={{ Toolbar: CustomToolbar }}
        className={classes.dataGridRemoveBorder}
      />
    </div>
  );
}