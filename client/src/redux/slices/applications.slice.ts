import { createSlice } from '@reduxjs/toolkit';
import { ApplicationInfo } from '../../models/interfaces';

const EmptyApplication: ApplicationInfo = []

export const applicationsSlice = createSlice({
    name: 'applications',
    initialState: EmptyApplication,
    reducers:{
       getApplications: (state, action)=>{
            return action.payload   
       },
       createApplication: (state, action) => {
        const newApplication = action.payload;
        state.push(newApplication); 
       }
    }
})

export const { getApplications, createApplication } = applicationsSlice.actions;

export default applicationsSlice.reducer