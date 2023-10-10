import { postUserHelper } from "../helpers"
import { User } from "../types"


export const postUserController = async (user: User) => {
    const newUser = await postUserHelper(user)
    return newUser
}