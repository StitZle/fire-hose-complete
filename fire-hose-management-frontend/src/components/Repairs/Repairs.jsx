import React, {useState} from 'react';
import {DevicesDataGrid} from "../Devices/DevicesDataGrid";
import RepairsDataGrid from "./RepairsDataGrid";
import DefaultPage from "../shared/DefaultPage";
import {useAuth0} from "@auth0/auth0-react";
import {RepairOverlay} from "./RepairOverlay";

const Repairs = () => {

    const {user} = useAuth0();

    const [selectedRepair, setSelectedRepair] = useState({})
    const [isDeleteOverlayVisible, setDeleteOverlayVisible] = useState(false)
    const [isAddOverlayVisible, setIsAddOverlayVisible] = useState(false)
    const [isEditOverlayVisible, setIsEditOverlayVisible] = useState(false)

    console.log(user)

    return (
        <DefaultPage>
            <h1>Reparaturen und Waschungen</h1>
            <RepairsDataGrid
                repairs={[]}
                selectedDeviceFunction={(repair) => setSelectedRepair(repair)}
                setDeleteOverlayVisibleFunction={(state) => setDeleteOverlayVisible(state)}
                setIsEditOverlayVisibleFunction={(state) => setIsEditOverlayVisible(state)}
                setIsAddOverlayVisibleFunction={(state) => setIsAddOverlayVisible(state)}
            />

            {isAddOverlayVisible &&
                <RepairOverlay
                    handleClose={() => setIsAddOverlayVisible(false)}
                />}

        </DefaultPage>
    );
}

export default Repairs