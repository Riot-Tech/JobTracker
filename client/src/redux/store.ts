import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/auth.slice";
import { AppStore } from "../models/interfaces";
import { applicationsSlice } from "./slices/applications.slice";



export const store = configureStore<AppStore>({
    reducer: {
        /* exampleReducer: exampleSlice.reducer, */
        user: userSlice.reducer,
        applications: applicationsSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;