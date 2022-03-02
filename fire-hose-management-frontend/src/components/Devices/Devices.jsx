import React, { useState } from 'react';
import { useGetAllDevices } from "../../hooks/useGetAllDevices";
import { useMutation } from "react-query";
import Notifications from "../shared/Notifications";
import { deleteDevice, postDevice, putDevice } from "../../utils/requests/Devices";
import { DeviceOverlay } from "./DeviceOverlay";
import { DeleteDeviceOverlay } from "./DeleteDevice Overlay";
import { DevicesDataGrid } from "./DevicesDataGrid";
import DefaultPage from "../shared/DefaultPage";


const Devices = () => {

  const [selectedDevice, setSelectedDevice] = useState( {} )
  const [isDeleteOverlayVisible, setDeleteOverlayVisible] = useState( false )
  const [isAddOverlayVisible, setIsAddOverlayVisible] = useState( false )
  const [isEditOverlayVisible, setIsEditOverlayVisible] = useState( false )

  const { devices, refetch } = useGetAllDevices();


  const addDeviceMutation = useMutation( ( deviceDto ) => postDevice( deviceDto ), {
    onSuccess: () => {
      Notifications.showSuccess( "Das Gerät wurde erfolgreich erstellt!" )
      setIsAddOverlayVisible( false )
      refetch();
    },
    onError: ( error ) => {
      Notifications.showError( "Fehler beim Hinzufügen des Gerätes!" )
      console.log( error )
    }
  } )

  const editDeviceMutation = useMutation( ( deviceDto ) => putDevice( selectedDevice.id, deviceDto ), {
    onSuccess: () => {
      Notifications.showSuccess( `Das Gerät: ${selectedDevice.deviceName} wurde erfolgreich aktualisiert!` )
      setIsEditOverlayVisible( false )
      refetch();
    },
    onError: ( error ) => {
      Notifications.showError( `Das Gerät: ${selectedDevice.deviceName} konnte nicht aktualisiert werden!` )
      console.log( error )
    }
  } )

  const deleteDeviceMutation = useMutation( () => deleteDevice( selectedDevice.id ), {
    onSuccess: () => {
      setDeleteOverlayVisible( false )
      Notifications.showSuccess( `Das Gerät: ${selectedDevice.deviceName} wurde erfolgreich gelöscht!` )
      refetch();
    },
    onError: ( error ) => {
      Notifications.showError( `Das Gerät: ${selectedDevice.deviceName} konnte nicht gelöscht werden!` )
      console.log( error )
    }
  } )

  const dtoBuilder = ( deviceName, deviceId, isPrimary ) => {
    return {
      deviceName: deviceName,
      deviceId: deviceId,
      isPrimary: isPrimary
    }
  }

  const addDevice = ( deviceName, deviceId, isPrimary ) => {
    addDeviceMutation.mutate( dtoBuilder( deviceName, deviceId, isPrimary ) )
  }

  const editDevice = ( deviceName, deviceId, isPrimary ) => {
    editDeviceMutation.mutate( dtoBuilder( deviceName, deviceId, isPrimary ) )
  }


  return (
      <DefaultPage>
        <h1>Geräteübersicht</h1>
        <DevicesDataGrid
            devices={devices}
            selectedDeviceFunction={( item ) => setSelectedDevice( item )}
            setDeleteOverlayVisibleFunction={( state ) => setDeleteOverlayVisible( state )}
            setIsEditOverlayVisibleFunction={( state ) => setIsEditOverlayVisible( state )}
            setIsAddOverlayVisibleFunction={( state ) => setIsAddOverlayVisible( state )}
        />

        {isAddOverlayVisible &&
            <DeviceOverlay
                handleClose={() => setIsAddOverlayVisible( false )}
                headline={"Neues Gerät hinzufügen"}
                submitBtnText={"Hinzufügen"}
                submitBtnFunction={addDevice}
            />}

        {isEditOverlayVisible &&
            <DeviceOverlay
                handleClose={() => setIsEditOverlayVisible( false )}
                headline={selectedDevice.deviceName + " bearbeiten"}
                submitBtnText={"Ändern"}
                submitBtnFunction={editDevice}
                initialDeviceName={selectedDevice.deviceName}
                initialDeviceId={selectedDevice.deviceId}
                initialIsPrimary={selectedDevice.isPrimary}
            />}


        {isDeleteOverlayVisible &&
            <DeleteDeviceOverlay
                deviceName={selectedDevice.deviceName}
                handleClose={() => setDeleteOverlayVisible( false )}
                submitBtnFunction={() => deleteDeviceMutation.mutate()}
            />}

      </DefaultPage>
  );
}

export default Devices;
