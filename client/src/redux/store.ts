import { configureStore } from "@reduxjs/toolkit";
import { exampleSlice } from "./slices";
import { userSlice } from "./slices/auth.slice";
import { AppStore } from "../models/interfaces";


export const store = configureStore<AppStore>({
    reducer: {
        /* exampleReducer: exampleSlice.reducer, */
        user: userSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;