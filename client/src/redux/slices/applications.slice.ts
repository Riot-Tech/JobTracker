import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApplicationInfo, Application } from '../../models/interfaces';

const EmptyApplication: ApplicationInfo = {
    applications: []
}

export const applicationsSlice = createSlice({
    name: 'applications',
    initialState: EmptyApplication,
    reducers:{
       getApplications: (state, action)=>{
            state.applications = action.payload
       }
    }
})

export const { getApplications } = applicationsSlice.actions;

export default applicationsSlice.reducer