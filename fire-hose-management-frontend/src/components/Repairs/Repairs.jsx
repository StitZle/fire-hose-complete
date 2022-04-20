import React, {useState} from 'react';
import {DevicesDataGrid} from "../Devices/DevicesDataGrid";
import RepairsDataGrid from "./RepairsDataGrid";
import DefaultPage from "../shared/DefaultPage";
import {ADD_REPAIR} from "../../router/navigationPaths";
import {useNavigate} from "react-router-dom";
import {useGetAllDeviceMaintenances} from "../../hooks/useGetAllDeviceMaintenances";

const Repairs = () => {

    const navigate = useNavigate();

    const { deviceMaintenances } = useGetAllDeviceMaintenances();
    console.log( deviceMaintenances );

    const [selectedRepair, setSelectedRepair] = useState( {} )
    const [isDeleteOverlayVisible, setDeleteOverlayVisible] = useState( false )
    const [isEditOverlayVisible, setIsEditOverlayVisible] = useState( false )


    const setIsAddOverlayVisible = () => {
        navigate( ADD_REPAIR.path, { replace: true } );
    }


    return (<DefaultPage>
        <h1>Gerätewartungen</h1>
        <RepairsDataGrid
                repairs={[]}
                selectedDeviceFunction={( repair ) => setSelectedRepair( repair )}
                setDeleteOverlayVisibleFunction={( state ) => setDeleteOverlayVisible( state )}
                setIsEditOverlayVisibleFunction={( state ) => setIsEditOverlayVisible( state )}
                setIsAddOverlayVisibleFunction={() => setIsAddOverlayVisible()}
        />

    </DefaultPage>);
}

export default Repairs