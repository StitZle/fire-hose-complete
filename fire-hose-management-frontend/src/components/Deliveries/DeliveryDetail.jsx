import DefaultPage from "../shared/DefaultPage";
import React from "react";
import {useLocation} from "react-router-dom";

const DeliveryDetail = () => {
    const location = useLocation();
    const delivery = location.state.delivery


    return (
        <DefaultPage>
            <h1>Delivery Detail {delivery.id}</h1>
        </DefaultPage>

    );
}
export default DeliveryDetail;