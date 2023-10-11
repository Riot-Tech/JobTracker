import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo{
    id: number,
    email: string,
    name: string
}
export const EmptyUserState: UserInfo = {
    id: 0,
    name:'',
    email:''
}

const addToLocalStorage = () => {

}

export const userSlice = createSlice({
    name: 'user',
    initialState: EmptyUserState,
    reducers:{
       createUser: (state, action) => {
        return action.payload
       },
       updateUser: (state, action) => {
        return ({...state, ...action.payload})
       },
       resetUser: () => EmptyUserState
    }
})

export const {createUser, updateUser, resetUser} = userSlice.actions;

export default userSlice.reducer