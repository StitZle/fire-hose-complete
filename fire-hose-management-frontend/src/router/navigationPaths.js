import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Dashboard from "../components/Dashboard";
import Deliveries from "../components/Deliveries/Deliveries";
import Departments from "../components/Departments/Departments";
import Devices from "../components/Devices/Devices";
import OrderForm from "../components/Order/OrderForm";
import OrderSuccess from "../components/Order/OrderSuccess";
import Repairs from "../components/Repairs/Repairs";

export const DASHBOARD = {
  path: "/",
  name: "Dashboard",
  exact: true,
  authRequired: false,
  icon: <DashboardIcon/>,
  component: <Dashboard/>,
}

export const DELIVERIES = {
  path: "/deliveries",
  name: "Abgaben",
  exact: true,
  authRequired: true,
  icon: <LocalShippingIcon/>,
  component: <Deliveries/>
}

export const REPAIRS = {
  path: "/repairs",
  name: "Reparaturen",
  exact: true,
  authRequired: true,
  icon: <BuildCircleIcon/>,
  component: <Repairs/>
}

export const DEPARTMENTS = {
  path: "/settings/departments",
  name: "Abteilungen",
  exact: true,
  authRequired: true,
  icon: <PeopleIcon/>,
  component: <Departments/>
}

export const DEVICES = {
  path: "/settings/devices",
  name: "Geräteübersicht",
  exact: true,
  authRequired: true,
  icon: <DeviceHubIcon/>,
  component: <Devices/>
}



export const ORDER_FORM = {
  path: "/order-form",
  name: "Auftrag",
  exact: true,
  authRequired: false,
  component: <OrderForm/>
}

export const ORDER_SUCCESS = {
  path: "/order-success",
  name: "Auftrag",
  exact: true,
  authRequired: false,
  component: <OrderSuccess/>
}


export const allRoutes = [
  DASHBOARD,
  DELIVERIES,
  REPAIRS,
  DEPARTMENTS,
  DEVICES,
  ORDER_FORM,
  ORDER_SUCCESS
]

export const primaryRoutes = [
  DASHBOARD,
  DELIVERIES,
  REPAIRS
]

export const secondaryRoutes = [
  DEPARTMENTS,
  DEVICES
]