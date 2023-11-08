import { createSlice } from '@reduxjs/toolkit';
import {  SpontaneousInfo } from '../../models/interfaces';

const EmptySpontaneous: SpontaneousInfo = []

export const spontaneousSlice = createSlice({
    name: 'spontaneous',
    initialState: EmptySpontaneous,
    reducers:{
       addSpontaneous: (state, action)=>{
            return action.payload.reverse()   
       },
    }
})

export const { addSpontaneous } = spontaneousSlice.actions;

export default spontaneousSlice.reducer