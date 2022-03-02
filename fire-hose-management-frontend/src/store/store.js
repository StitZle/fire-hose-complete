import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import {drawerReducer} from "./reducers/drawerReducer"

const combinedReducers = combineReducers({
    drawerReducer
});

export const store = createStore(combinedReducers, applyMiddleware(thunkMiddleware));