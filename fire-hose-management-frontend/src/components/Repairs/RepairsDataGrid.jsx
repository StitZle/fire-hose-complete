import {DataGrid, GridToolbarContainer, GridToolbarExport} from '@mui/x-data-grid';
import {gridLocale} from "../../i118/GridLocale";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@material-ui/core/IconButton";
import {Button, Checkbox} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles( ( theme ) => ({
  dataGrid: {
    height: 720,
    width: "100%"
  },
  dataGridRemoveBorder: {
    border: "none !important",
  }
}) );

const RepairsDataGrid = ( {
                            repairs = [],
                            selectedRepairFunction,
                            setDeleteOverlayVisibleFunction,
                            setIsEditOverlayVisibleFunction,
                            setIsAddOverlayVisibleFunction

                          } ) => {
  const classes = useStyles();

  const buttons = [
    {
      key: 1,
      labelText: "Gerät löschen",
      icon: <DeleteIcon/>,
      onClick: () => {
        setDeleteOverlayVisibleFunction( true )
      }
    }, {
      key: 1,
      labelText: "Gerät bearbeiten",
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

  const checkboxRender = ( params ) => {
    return (
      <Checkbox
        checked={params.value}
        disabled={true}
        color="primary"
      />
    )
  }

  const columns = [
    { field: "deviceName", headerName: "Gerätename", flex: true },
    { field: "deviceId", headerName: "Kennung", flex: true },
    { field: "isPrimary", headerName: "Primäres Gerät", renderCell: checkboxRender, flex: true },
    { field: "", headerName: "Aktionen", renderCell: buttonHandler, flex: true }
  ]

  const CustomToolbar = () => {
    return (<GridToolbarContainer className={"grid-toolbar-container"}>
              <Button variant="contained" color="primary" onClick={() => setIsAddOverlayVisibleFunction()}>
                Wartung hinzufügen</Button>

              <GridToolbarExport/>
            </GridToolbarContainer>
    )
  }


  return (
    <div className={classes.dataGrid}>
      <DataGrid
        disableColumnMenu={true}
        rows={repairs}
        columns={columns}
        pageSize={10}
        loading={repairs.length === 0}
        onRowClick={( item ) => selectedRepairFunction( item.row )}
        localeText={gridLocale}
        components={{ Toolbar: CustomToolbar }}
        className={classes.dataGridRemoveBorder}
      />
    </div>
  );
}

export default RepairsDataGrid;