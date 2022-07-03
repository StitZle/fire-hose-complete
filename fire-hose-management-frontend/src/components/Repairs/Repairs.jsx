import React from "react";
import RepairsDataGrid from "./RepairsDataGrid";
import DefaultPage from "../shared/DefaultPage";
import {ADD_REPAIR} from "../../router/navigationPaths";
import {useNavigate} from "react-router-dom";
import {useGetAllDeviceMaintenances} from "../../hooks/useGetAllDeviceMaintenances";

const Repairs = () => {
    const navigate = useNavigate();

    const { deviceMaintenances } = useGetAllDeviceMaintenances();

    const setIsAddOverlayVisible = () => {
        navigate( ADD_REPAIR.path, { replace: true } );
    };

    return (<DefaultPage>
        <h1>Gerätewartungen</h1>
        <RepairsDataGrid
                repairs={deviceMaintenances}
                setIsAddOverlayVisibleFunction={() => setIsAddOverlayVisible()}
        />
    </DefaultPage>);
};

export default Repairs;
