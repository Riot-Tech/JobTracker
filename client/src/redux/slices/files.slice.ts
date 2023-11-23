import { createSlice } from "@reduxjs/toolkit";
import { File } from "../../models/interfaces";

const files: File[] = [];
const filesCopy: File[] = [];

export const fileSlice = createSlice({
  name: "filesState",
  initialState: {
    files,
    filesCopy,
  },
  reducers: {
    addFile: (state, action) => {
      state.files = action.payload;
      state.filesCopy = action.payload;
      return state;
    },
    searchFiles: (state, action) => {
      let coincidence = action.payload;
      if (!coincidence.length) {
        state.files = state.filesCopy;
        return state;
      }

      let newFiles = state.filesCopy
        .map((file) => {
          let values = Object.values(file);
          if (
            values.some((position) => {
              if (typeof position === "string") {
                return position.toLowerCase().includes(coincidence);
              }
              return false; // Añadir este retorno para manejar el caso en que position no es un string
            })
          ) {
            return file;
          }
          return undefined; // Retornar undefined en el caso en que no haya coincidencia
        })
        .filter((element): element is File => element !== undefined);

      state.files = newFiles;

      return state;
    },
  },
});

export const { addFile, searchFiles } = fileSlice.actions;

export default fileSlice.reducer;
