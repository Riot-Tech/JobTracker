import { createSlice } from '@reduxjs/toolkit';

export const sideBarSlice = createSlice({
    name: 'sideBarOpen',
    initialState: false,
    reducers:{
       handleSideBar: (state, action)=>{
            console.log(state)
            return action.payload
       },
    }
})

export const { handleSideBar } = sideBarSlice.actions;

export default sideBarSlice.reducer