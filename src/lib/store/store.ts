import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { AuthReducer } from "./AuthReducer";
import {SidebarReducer} from "./SidebarReducer.tsx";


export const rootReducer = combineReducers({
    auth: AuthReducer,
    sidebar: SidebarReducer
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: true
});