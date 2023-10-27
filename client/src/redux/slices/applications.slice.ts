import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApplicationInfo, Application } from '../../models/interfaces';

const EmptyApplication: ApplicationInfo = []

export const applicationsSlice = createSlice({
    name: 'applications',
    initialState: EmptyApplication,
    reducers:{
       getApplications: (state, action)=>{
            return action.payload   
       }
    }
})

export const { getApplications } = applicationsSlice.actions;

export default applicationsSlice.reducer