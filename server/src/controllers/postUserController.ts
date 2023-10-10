import { postUserHelper } from "../helpers"



export const postUserController = async (user: any) => {
    const newUser = await postUserHelper(user)
    return newUser
}