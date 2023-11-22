import { createSlice } from "@reduxjs/toolkit";
import { File } from "../../models/interfaces";

const files: File[] = [];

export const fileSlice = createSlice({
    name: "file",
    initialState: files
    ,
    reducers: {
        addFile: (state, action) => {
            state= action.payload;
            return state;
        },
    },
});

export const { addFile } = fileSlice.actions;

export default fileSlice.reducer;