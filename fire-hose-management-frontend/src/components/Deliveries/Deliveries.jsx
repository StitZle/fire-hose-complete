import React from 'react';
import DefaultPage from "../shared/DefaultPage";
import DeliveriesDataGrid from "./DeliveriesDataGrid";
import { useGetAllOrdersBetweenDates } from "../../hooks/useGetAllOrdersBetweenDates";
import dayjs from "dayjs";

const Deliveries = () => {

  const { deliveries } = useGetAllOrdersBetweenDates(
    dayjs().startOf( "year" ).format( "DD/MM/YYYY" ),
    dayjs().format( "DD/MM/YYYY" ) );


  return (
    <DefaultPage>
      <h1>Abgaben</h1>
      <DeliveriesDataGrid
        deliveries={deliveries}
      />
    </DefaultPage>
  );
}

export default Deliveries;