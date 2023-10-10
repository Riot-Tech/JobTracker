import { postUserHelper } from "../helpers"
import { User } from "@prisma/client"


export const postUserController = async (user: User) => {
    const newUser = await postUserHelper(user)
    return newUser
}