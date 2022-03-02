import {TOGGLE_DRAWER} from "../reducers/drawerReducer";

export const setIsDrawerOpen = (value) =>{
    return{
        type: TOGGLE_DRAWER,
        value
    }
}