import axios from "axios";

export const getAllDevices = () => {
    return axios.get( process.env.REACT_APP_BACKEND_URL_DEVICES ).then( ( response ) => {
        return response.data;
    } );
};

export const postDevice = (deviceDto) => {
    return axios.post( process.env.REACT_APP_BACKEND_URL_DEVICES, deviceDto ).then( ( response ) => {
        return response;
    } );
};

export const putDevice = (deviceId, deviceDto) => {
    return axios.put( process.env.REACT_APP_BACKEND_URL_DEVICES_SPECIFIC + deviceId, deviceDto ).then( ( response ) => {
        return response;
    } );
};

export const deleteDevice = (deviceId) => {
    return axios.delete( process.env.REACT_APP_BACKEND_URL_DEVICES_SPECIFIC + deviceId ).then( ( response ) => {
        return response;
    } );
};
