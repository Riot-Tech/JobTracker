import { createSlice } from "@reduxjs/toolkit";
import { Spontaneous } from "../../models/interfaces";

const EmptySpontaneous: Spontaneous[] = [];
const EmptyCopySpontaneous: Spontaneous[] = [];

export const spontaneousSlice = createSlice({
  name: "spontaneous",
  initialState: {
    EmptySpontaneous,
    EmptyCopySpontaneous
    },
  reducers: {
    addSpontaneous: (state, action) => {
      state.EmptySpontaneous = action.payload;
      state.EmptyCopySpontaneous = action.payload;
      return state;
    },
    
    searchSpontaneous: (state, action) => {
      let coincidence = action.payload;
      
      if(!coincidence.length) {
        state.EmptyCopySpontaneous = state.EmptySpontaneous;
        return state;
      }

      let newSpontaneous = state.EmptyCopySpontaneous.map((spont) => {
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
        .filter((element): element is Spontaneous => element !== undefined);

      state.EmptyCopySpontaneous = newSpontaneous;

        return state;
    },
  },
});

export const { addSpontaneous, searchSpontaneous } = spontaneousSlice.actions;

export default spontaneousSlice.reducer;
