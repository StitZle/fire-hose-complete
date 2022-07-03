import axios from "axios";

export const postOrder = (orderDto) => {
    return axios.post( process.env.REACT_APP_BACKEND_URL_ORDERS, orderDto ).then( ( response ) => {
        return response;
    } );
};
