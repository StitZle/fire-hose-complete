import {useQuery} from "react-query";
import Notifications from "../components/shared/Notifications";
import {getAllDepartments} from "../utils/requests/Departments";

export const useGetAllDepartments = () => {
    const { data: departments = [] } = useQuery( "getAllDepartments", () => getAllDepartments(), {
        onError: ( error ) => {
            Notifications.showError( "Die Abteilungen konnten nicht abgerufen werden!" );
            console.log( error );
        },
    } );

    return { departments };
};
