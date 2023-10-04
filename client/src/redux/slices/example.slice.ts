import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface MyObj {
    id: number | string,
    name: string,
    info: string
}

// Defino un tipo para el state de este slice
interface ExampleState {
    prop1: number,
    prop2: string,
    prop3: MyObj[]
}

// Uso ese tipo para definir el estado inicial
const initialState: ExampleState = {
    prop1: 3,
    prop2: "Hola Mundo!",
    prop3: [{id: 1, name: 'FirstObj', info: 'wowInfoo'}]
}

// Creo el slice (mi reductor) usando el interface y el state que cree
export const exampleSlice = createSlice({
    name: 'example',
    initialState,
    reducers: {
        increaseProp1: (state) => {
            state.prop1++;
        },
        decreaseProp1: (state) => {
            state.prop1--;
        },
        addObj: (state, action: PayloadAction<MyObj>) => {
            state.prop3.push(action.payload);
        }
    }
});

export const { increaseProp1, decreaseProp1, addObj } = exampleSlice.actions;