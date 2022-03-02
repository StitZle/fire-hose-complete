import {useQuery} from "react-query";
import Notifications from "../components/shared/Notifications";
import {getAllOrdersBetweenDates} from "../utils/requests/Deliveries";

export const useGetAllOrdersBetweenDates = (startDate, endDate) => {
    const {
        data: deliveries = [],
        refetch
    } = useQuery("getAllOrdersBetweenDates", () => getAllOrdersBetweenDates(startDate, endDate), {
        onError: (error) => {
            Notifications.showError("Die Abgaben konnten nicht abgerufen werden!")
            console.log(error)
        }
    })

    return {
        deliveries,
        refetch
    }
}