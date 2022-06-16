import React, { useState } from "react";
import { useGetAllDevices } from "../../hooks/useGetAllDevices";
import { useMutation } from "react-query";
import Notifications from "../shared/Notifications";
import { deleteDevice, postDevice, putDevice } from "../../utils/requests/Devices";
import { CreateDeviceOverlay } from "./CreateDeviceOverlay";
import { DeleteDeviceOverlay } from "./DeleteDevice Overlay";
import DefaultPage from "../shared/DefaultPage";
import DevicesDataGrid from "./DevicesDataGrid";
import EditDeviceOverlay from "./EditDeviceOverlay";

const Devices = () => {
  const [selectedDevice, setSelectedDevice] = useState({});
  const [isDeleteOverlayVisible, setDeleteOverlayVisible] = useState(false);
  const [isAddOverlayVisible, setIsAddOverlayVisible] = useState(false);
  const [isEditOverlayVisible, setIsEditOverlayVisible] = useState(false);

  const { devices, refetch } = useGetAllDevices();

  const handleCreateAndRefetch = () => {
    setIsAddOverlayVisible(false);
    refetch();
  };

  const handleEditAndRefetch = () => {
    setIsEditOverlayVisible(false);
    refetch();
  };

  const handleDeleteAndRefetch = () => {
    setDeleteOverlayVisible(false);
    refetch();
  };

  return (
    <DefaultPage>
      <h1>Geräteübersicht</h1>
      <DevicesDataGrid
        devices={devices}
        selectedDeviceFunction={(item) => setSelectedDevice(item)}
        setDeleteOverlayVisibleFunction={(state) => setDeleteOverlayVisible(state)}
        setIsEditOverlayVisibleFunction={(state) => setIsEditOverlayVisible(state)}
        setIsAddOverlayVisibleFunction={(state) => setIsAddOverlayVisible(state)}
      />

      {isAddOverlayVisible && (
        <CreateDeviceOverlay
          closeOverlayAndRefetch={() => handleCreateAndRefetch()}
          closeOverlay={() => setIsAddOverlayVisible(false)}
        />
      )}

      {isEditOverlayVisible && (
        <EditDeviceOverlay
          closeOverlayAndRefetch={() => handleEditAndRefetch()}
          closeOverlay={() => setIsEditOverlayVisible(false)}
          device={selectedDevice}
        />
      )}

      {isDeleteOverlayVisible && (
        <DeleteDeviceOverlay
          closeOverlayAndRefetch={() => handleDeleteAndRefetch()}
          closeOverlay={() => setDeleteOverlayVisible(false)}
          device={selectedDevice}
        />
      )}
    </DefaultPage>
  );
};

export default Devices;
