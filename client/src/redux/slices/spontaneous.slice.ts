import { createSlice } from '@reduxjs/toolkit';
import {  Spontaneous } from '../../models/interfaces';

const EmptySpontaneous: Spontaneous[] = []

export const spontaneousSlice = createSlice({
    name: 'spontaneous',
    initialState: EmptySpontaneous,
    reducers:{
       addSpontaneous: (state, action)=>{
            state = action.payload
            return state 
       },
    }
})

export const { addSpontaneous } = spontaneousSlice.actions;

export default spontaneousSlice.reducer