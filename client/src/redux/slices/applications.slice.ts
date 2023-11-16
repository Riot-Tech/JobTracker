import { createSlice } from '@reduxjs/toolkit';
import { Application } from '../../models/interfaces';

const EmptyApplications: Application[] = []
const EmptyCopyApplications: Application[] = []

export const applicationsSlice = createSlice({
    name: 'applications',
    initialState: {
        EmptyApplications,
        EmptyCopyApplications
    },
    reducers:{
       getApplications: (state, action)=>{
            state.EmptyApplications = action.payload
            state.EmptyCopyApplications = action.payload
            return state   
       },
       createApplication: (state, action) => {
        const newApplication = action.payload;
        state.EmptyApplications.unshift(newApplication); 
       },
       searchApplication: (state, action) => {
        let coincidence = action.payload;
      if(!coincidence.length) {
        state.EmptyApplications = state.EmptyCopyApplications;
        return state;
      }

      let newApplications = state.EmptyCopyApplications.map((spont) => {
          let values = Object.values(spont);
          if (
            values.some((position) => {
              if (typeof position === "string") {
                return position.toLowerCase().includes(coincidence);
              }
              return false; // Añadir este retorno para manejar el caso en que position no es un string
            })
          ) {
            return spont;
          }
          return undefined; // Retornar undefined en el caso en que no haya coincidencia
        })
        .filter((element): element is Application => element !== undefined);

      state.EmptyApplications = newApplications;

        return state;
       }
    }
})

export const { getApplications, createApplication, searchApplication } = applicationsSlice.actions;

export default applicationsSlice.reducer