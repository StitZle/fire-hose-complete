import {useQuery} from "react-query";
import Notifications from "../components/shared/Notifications";
import {getAllNewMaintenanceDevices} from "../utils/requests/MaintenanceDevices";

export const useGetAllNewMaintenanceDevices = () => {
    const { data: maintenanceDevices = [] } = useQuery( "getNewMaintenanceDevices", () => getAllNewMaintenanceDevices(), {
        onError: ( error ) => {
            Notifications.showError( "Die Geräte konnten nicht abgerufen werden!" );
            console.log( error );
        },
    } );

    return {
        maintenanceDevices,
    };
};
