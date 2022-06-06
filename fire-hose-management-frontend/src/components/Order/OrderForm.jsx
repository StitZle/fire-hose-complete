import {Button, CircularProgress, Grid, makeStyles, MenuItem} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useGetAllDepartments} from "../../hooks/useGetAllDepartments";
import {useGetAllDevices} from "../../hooks/useGetAllDevices";
import deepClone from "deep-clone";
import {CTextField} from "../shared/input/CTextField";
import {CLine} from "../shared/styling/CLine";
import {CSelect} from "../shared/input/CSelect";
import {ValidatorForm} from 'react-material-ui-form-validator';
import {useMutation} from "react-query";
import {postOrder} from "../../utils/requests/Orders";
import {ORDER_SUCCESS} from "../../router/navigationPaths";
import {useNavigate} from 'react-router-dom';
import DefaultPage from "../shared/DefaultPage";

const useStyles = makeStyles( ( theme ) => ({
  italic: {
    fontStyle: "italic"
  },
  grid: {
    textAlign: "center",

  },
  submitButton: {
    marginTop: 20,
  },
}) );

const OrderForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [department, setDepartment] = useState( "" )
  const [showDevices, setShowDevices] = useState( [] )
  const [nonShowDevices, setNonShowDevices] = useState( [] )

  const [notes, setNotes] = useState( "" )
  const [firstname, setFirstname] = useState( "" )
  const [lastname, setLastname] = useState( "" )

  const { departments } = useGetAllDepartments();
  const { devices } = useGetAllDevices();

  const selectableDepartments = departments.map( ( department, index ) =>
          <MenuItem key={index} value={department}>{department.departmentName}</MenuItem> )

  const postOrderMutation = useMutation( ( orderDto ) => postOrder( orderDto ), {
    onSuccess: ( response ) => {
      navigate( ORDER_SUCCESS.path, {
        state: {
          order: response.data
        }
      } )
      //TODO update this with Notifications
      console.log( "Success" )
    },
    onError: ( error ) => {
      console.log( "Error" )
    }
  } )

  useEffect( () => {
    if( devices.length !== 0 ) {

      let showDeviceArray = []
      let nonShowDeviceArray = []

      devices.forEach( ( device ) => {
        device.count = 0
        if( device.isPrimary ) {
          showDeviceArray.push( device )
        }
        else {
          nonShowDeviceArray.push( device )
        }
      } )
      setShowDevices( showDeviceArray )
      setNonShowDevices( nonShowDeviceArray )
    }
  }, [devices, devices.length] )

  useEffect( () => {
    if( Object.keys( department ).length !== 0 && firstname.length !== 0 && lastname.length !== 0 ) {
      //TODO Use Effect macht hier keinen sinn
      //Check here if num of total devices is greater than zero
    }
  } )

  const handleDeviceInput = ( index, value ) => {
    const newShowDevices = deepClone( showDevices )
    newShowDevices[index].count = value
    setShowDevices( newShowDevices )
  }

  const primaryDevices = showDevices.map( ( device, index ) => {
    return (
      <Grid item lg={12} md={12} xs={12} key={index}>
        <CTextField
          required={false}
          type={"number"}
          label={device.deviceName}
          value={device.count}
          InputProps={{ inputProps: { min: 0 } }}
          onChange={( event ) => handleDeviceInput( index, event.target.value )}
        />
      </Grid>
    )
  } )

  const secondaryDevices = nonShowDevices.map( ( device, index ) =>
    <MenuItem key={index} value={device}>{device.deviceName}</MenuItem>
  )


  const handelSecondaryDeviceChange = ( item ) => {
    //remove item from list
    setNonShowDevices( nonShowDevices.filter( device => device.deviceName !== item.deviceName ) )

    //add item to showDevices List
    setShowDevices( showDevices => [...showDevices, item] )
  }

  const handleSubmit = ( event ) => {
    event.preventDefault()

    let orderDto = {
      department: {
        id: department.id,
        departmentName: department.departmentName,
        contact: {
          firstname: department.contact.firstname,
          lastname: department.contact.lastname,
          gender: department.contact.gender,
          mail: department.contact.mail
        },
        street: department.street,
        houseNumber: department.houseNumber,
        location: department.location,
        postalCode: department.postalCode,
        country: department.country,
        registered: department.registered,
        sendConfirmationMail: department.sendConfirmationMail
      },
      contact: null,
      devices: showDevices.filter( device => device.count > 0 ),
      firstname: firstname,
      lastname: lastname,
      notes: (notes !== "") ? notes : null
    };
    console.log( orderDto )
    postOrderMutation.mutate( orderDto )
  }

  return (
    <DefaultPage>
      {(departments.length === 0 && devices.length === 0) &&
        <Grid container>
          {/*TODO show this in the middle of the screen*/}
          <Grid item lg={12} md={12} xs={12} className={classes.grid}>
            <CircularProgress/>
          </Grid>
        </Grid>}


      {/*TODO show this in the middle of the screen*/}
      {(departments.length !== 0 && devices.length !== 0) &&
        <ValidatorForm onSubmit={handleSubmit}>
          <Grid container spacing={3} className={classes.form}>
            <Grid item lg={12} md={12} xs={12}>
              <h3>Hinweise:</h3>
              <ul>
                <li>Zu reinigende Schläuche, die keine Defekte aufweisen, bitte immer aufgerollt in das
                  jeweilige Fahrregal
                  <span className={classes.italic}>"Schläuche benutzt"</span> stellen.
                </li>
                <li>Defekte/beschädigte Schläuche bitte immer mit <b>einem Konten</b> versehen und den
                  defekten Schlauch (wenn
                  möglich gerollt) in die Box <span
                    className={classes.italic}>"Schläuche defekt"</span> stellen.
                </li>
                <li>Saubere Schläuche bitte aus den Fahrregalen <span
                  className={classes.italic}>"Schläuche sauber"</span> entnehmen.
                  Dazu muss kein Formular ausgefüllt werden.
                </li>
              </ul>
            </Grid>

            <Grid item lg={12} md={12} xs={12}>
              <CSelect
                label={"Abteilung auswählen"}
                value={department}
                onChange={( event ) => setDepartment( event.target.value )}
                options={selectableDepartments}
                validators={["required"]}
                errorMessages={["Bitte wählen Sie eine Abteilung aus!"]}
              />
            </Grid>

            <Grid item lg={12} md={12} xs={12}>
              <CLine title={"Geräte"}/>
            </Grid>

            {primaryDevices}

            {nonShowDevices.length !== 0 &&
              <Grid item lg={12} md={12} xs={12}>
                <CSelect
                  value={""}
                  label={"Gerät hinzufügen"}
                  onChange={( event ) => handelSecondaryDeviceChange( event.target.value )}
                  options={secondaryDevices}
                />
              </Grid>}

            <Grid item lg={12} md={12} xs={12}>
              <CTextField
                required={false}
                multiline
                rows={4}
                label={"Anmerkungen"}
                value={notes}
                onChange={( event ) => setNotes( event.target.value )}
              />
            </Grid>

            <Grid item lg={12} md={12} xs={12}>
              <CLine title={"Absender"}/>
            </Grid>

            <Grid item lg={6} md={6} xs={12}>
              <CTextField
                      label={"Absender Vorname"}
                      value={firstname}
                      onChange={( event ) => setFirstname( event.target.value )}
                      validators={["required"]}
                      errorMessages={"Bitte geben Sie einen Vorname an!"}
              />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <CTextField
                      label={"Absender Nachname"}
                      value={lastname}
                      onChange={( event ) => setLastname( event.target.value )}
                      validators={["required"]}
                      errorMessages={"Bitte geben Sie einen Nachnamen an!"}
              />
            </Grid>

            {/*TODO align Item right*/}
            <Grid item>
              <Button variant="contained" color="primary" type={"submit"}
                      className={classes.submitButton}>Absenden</Button>
            </Grid>

          </Grid>

          {/*<Grid container justify="flex-end">
                            <Grid item>
                                <Button variant="contained" color="primary" type={"submit"}
                                        className={classes.submitButton}>Absenden</Button>
                            </Grid>
                        </Grid>*/}
        </ValidatorForm>}
    </DefaultPage>
  );
};

export default OrderForm;