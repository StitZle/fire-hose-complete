import { useQuery } from "react-query";
import Notifications from "../components/shared/Notifications";
import { getAllDevices } from "../utils/requests/Devices";

export const useGetAllDevices = () => {
    const { data: devices = [] } = useQuery("getAllDevices", () => getAllDevices(), {
        onError: (error) => {
            Notifications.showError("Die Geräte konnten nicht abgerufen werden!");
            console.log(error);
        },
    });

    return { devices };
};
