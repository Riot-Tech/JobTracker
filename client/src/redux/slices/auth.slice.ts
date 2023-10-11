import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from '../../models/interfaces';

export const EmptyUserState: UserInfo = {
    id: 0,
    name:'',
    email:'',
    token: ''
}

const addToLocalStorage = (user: UserInfo) => { 
    localStorage.setItem('user', JSON.stringify({...user}))
}

export const userSlice = createSlice({
    name: 'user',
    initialState: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : EmptyUserState, //PERSISTENCIA
    reducers:{
       createUser: (state, action) => {
        addToLocalStorage(action.payload)
        return action.payload
       },
       updateUser: (state, action) => {
        
        return ({...state, ...action.payload})
       },
       resetUser: () => {
           localStorage.removeItem('user')
           return EmptyUserState
       }
    }
})

export const {createUser, updateUser, resetUser} = userSlice.actions;

export default userSlice.reducer