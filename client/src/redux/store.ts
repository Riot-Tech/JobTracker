import { configureStore } from "@reduxjs/toolkit";
import { exampleSlice } from "./slices";
import { userSlice } from "./slices/auth.slice";

export const store = configureStore({
    reducer: {
        exampleReducer: exampleSlice.reducer,
        user: userSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;