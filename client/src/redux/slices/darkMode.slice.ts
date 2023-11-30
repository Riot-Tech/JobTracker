import { createSlice } from '@reduxjs/toolkit';

export const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState: JSON.parse(localStorage.getItem('theme') ?? 'false'),
    reducers:{
       handleDarkMode: (state, action)=>{
            return action.payload
       },
    }
})

export const { handleDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer