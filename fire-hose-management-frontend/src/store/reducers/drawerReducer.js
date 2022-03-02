export const TOGGLE_DRAWER = "TOGGLE_DRAWER";

const initialState = {
    isDrawerOpen: false
};

export const getDrawer = state => state.drawerReducer.isDrawerOpen;

export const drawerReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_DRAWER:
            return {isDrawerOpen: action.value}
        default:
            return state
    }
}