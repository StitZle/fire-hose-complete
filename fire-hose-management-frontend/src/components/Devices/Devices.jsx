import React, { useState } from "react";
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

    return (
        <DefaultPage>
            <h1>Geräteübersicht</h1>
            <DevicesDataGrid
                selectedDeviceFunction={(item) => setSelectedDevice(item)}
                setDeleteOverlayVisibleFunction={(state) => setDeleteOverlayVisible(state)}
                setIsEditOverlayVisibleFunction={(state) => setIsEditOverlayVisible(state)}
                setIsAddOverlayVisibleFunction={(state) => setIsAddOverlayVisible(state)}
            />

            {isAddOverlayVisible && <CreateDeviceOverlay closeOverlay={() => setIsAddOverlayVisible(false)} />}

            {isEditOverlayVisible && (
                <EditDeviceOverlay closeOverlay={() => setIsEditOverlayVisible(false)} device={selectedDevice} />
            )}

            {isDeleteOverlayVisible && (
                <DeleteDeviceOverlay closeOverlay={() => setDeleteOverlayVisible(false)} device={selectedDevice} />
            )}
        </DefaultPage>
    );
};

export default Devices;
