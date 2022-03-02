import React, {useState} from 'react';
import {DevicesDataGrid} from "../Devices/DevicesDataGrid";
import RepairsDataGrid from "./RepairsDataGrid";
import DefaultPage from "../shared/DefaultPage";

const Repairs = () => {

    const [selectedRepair, setSelectedRepair] = useState( {} )
    const [isDeleteOverlayVisible, setDeleteOverlayVisible] = useState( false )
    const [isAddOverlayVisible, setIsAddOverlayVisible] = useState( false )
    const [isEditOverlayVisible, setIsEditOverlayVisible] = useState( false )

    return (
        <DefaultPage>
            <h1>Repairs</h1>
            <RepairsDataGrid
                repairs={[]}
                selectedDeviceFunction={( repair ) => setSelectedRepair( repair )}
                setDeleteOverlayVisibleFunction={( state ) => setDeleteOverlayVisible( state )}
                setIsEditOverlayVisibleFunction={( state ) => setIsEditOverlayVisible( state )}
                setIsAddOverlayVisibleFunction={( state ) => setIsAddOverlayVisible( state )}
            />
        </DefaultPage>
    );
}

export default Repairs