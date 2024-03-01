import { combineReducers, configureStore } from "@reduxjs/toolkit";
import Loader from "./slices/Loader";
import Notification from "./slices/Notification";
import LoginSlice from "./slices/LoginSlice";
import AdminSlice from "./slices/AdminSlice";
import ChatSlice from "./slices/ChatSlice";
import UserSlice from "./slices/UserSlice";

export const store = configureStore({
    reducer: combineReducers({
        LoadingReducer: Loader,
        NotificationReducer: Notification,
        LoginReducer: LoginSlice,
        AdminReducer: AdminSlice,
        ChatReducer: ChatSlice,
        UserReducer: UserSlice
    })
})