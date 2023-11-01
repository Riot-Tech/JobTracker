import { createSlice } from '@reduxjs/toolkit';
import {  SpontaneousInfo } from '../../models/interfaces';

const EmptySpontaneous: SpontaneousInfo = []

export const spontaneousSlice = createSlice({
    name: 'spontaneous',
    initialState: EmptySpontaneous,
    reducers:{
       getSpontaneous: (state, action)=>{
            return action.payload   
       }
    }
})

export const { getSpontaneous } = spontaneousSlice.actions;

export default spontaneousSlice.reducer