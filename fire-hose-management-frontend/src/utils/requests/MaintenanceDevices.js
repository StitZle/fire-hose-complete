import axios from "axios";
import urlBuilder from "../urlBuilder";

export const getAllOrdersBetweenDates = ( startDate, endDate ) => {
    return axios.get( urlBuilder.deliveriesBetweenDates(), {
        params: {
            startDate: startDate,
            endDate: endDate
        }
    } ).then( ( response ) => {
        return response.data
    } )
}

export const getAllNewMaintenanceDevices = () => {
    return axios.get( urlBuilder.maintenanceDevicesTemplates() ).then( ( response ) => {
        return response.data
    } )
}

export const getAllDeviceMaintenances = () => {
    return axios.get( urlBuilder.maintenanceDevices() ).then( ( response ) => {
        return response.data
    } )
}

export const addDeviceMaintenance = ( deviceMaintenance ) => {
    return axios.post( urlBuilder.maintenanceDevices(), deviceMaintenance ).then( ( response ) => {
        return response.data
    } )
}