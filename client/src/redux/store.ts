import { configureStore } from "@reduxjs/toolkit";
import { exampleSlice } from "./slices";
export const store = configureStore({
    reducer: {
        exampleReducer: exampleSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;