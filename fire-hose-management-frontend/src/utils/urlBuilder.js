import { urls } from "./constants";

const isStaging = true;

class urlBuilder {
    static deliveriesBetweenDates = () => {
        if (isStaging) {
            return urls.deliveries.staging;
        }
        return urls.deliveries.prod;
    };

    static maintenanceDevicesTemplates = () => {
        if (isStaging) {
            return urls.maintenanceDevicesTemplates.staging;
        }
        return urls.maintenanceDevicesTemplates.prod;
    };

    static maintenanceDevices = () => {
        if (isStaging) {
            return urls.maintenanceDevices.staging;
        }
        return urls.maintenanceDevices.prod;
    };
}

export default urlBuilder;
