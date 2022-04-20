import {urls} from "./constants";

const isStaging = true

class urlBuilder {

    static departments = () => {
        if (isStaging) {
            return urls.departments.staging
        }
        return urls.departments.prod
    }

    static departmentWithId = (departmentId) => {
        if (isStaging) {
            return urls.departments.staging + departmentId
        }
        return urls.departments.prod + departmentId
    }

    static devices = () => {
        if (isStaging) {
            return urls.devices.staging
        }
        return urls.devices.prod
    }

    static deviceWithId = (deviceId) => {
        if (isStaging) {
            return urls.devices.staging + deviceId
        }
        return urls.devices.prod + deviceId
    }

    static postOrder = () => {
        if (isStaging) {
            return urls.orders.staging
        }
        return urls.orders.prod
    }

    static orderWithID = (orderId) => {
        if (isStaging) {
            return urls.orders.staging + orderId
        }
        return urls.orders.prod + orderId
    }

    static deliveriesBetweenDates = () => {
        if( isStaging ) {
            return urls.deliveries.staging
        }
        return urls.deliveries.prod
    }

    static maintenanceDevicesTemplates = () => {
        if( isStaging ) {
            return urls.maintenanceDevicesTemplates.staging
        }
        return urls.maintenanceDevicesTemplates.prod
    }

    static maintenanceDevices = () => {
        if( isStaging ) {
            return urls.maintenanceDevices.staging
        }
        return urls.maintenanceDevices.prod
    }


}

export default urlBuilder;