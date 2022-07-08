import { useQuery } from "react-query";
import Notifications from "../components/shared/Notifications";
import { getAllDeviceMaintenances } from "../utils/requests/MaintenanceDevices";

export const useGetAllDeviceMaintenances = () => {
    const { data: deviceMaintenances = [], refetch } = useQuery(
        "getAllDeviceMaintenances",
        () => getAllDeviceMaintenances(),
        {
            onError: (error) => {
                Notifications.showError("Die Gerätewartungen konnten nicht abgerufen werden!");
                console.log(error);
            },
        }
    );

    return {
        deviceMaintenances,
        refetch,
    };
};
