import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/auth.slice";
import { AppStore } from "../models/interfaces";
import { applicationsSlice } from "./slices/applications.slice";
import { spontaneousSlice } from "./slices/spontaneous.slice";
import { sideBarSlice } from "./slices/sideBar.slice";



export const store = configureStore<AppStore>({
    reducer: {
        user: userSlice.reducer,
        applications: applicationsSlice.reducer,
        spontaneous: spontaneousSlice.reducer,
        sideBarOpen : sideBarSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;