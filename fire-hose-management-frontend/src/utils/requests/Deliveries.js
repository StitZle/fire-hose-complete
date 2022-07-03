import axios from "axios";
import urlBuilder from "../urlBuilder";

export const getAllOrdersBetweenDates = (startDate, endDate) => {
    console.log( startDate, endDate );
    return axios
            .get( urlBuilder.deliveriesBetweenDates(), {
                params: {
                    startDate: startDate,
                    endDate: endDate,
                },
            } )
            .then( ( response ) => {
                return response.data;
            } );
};
