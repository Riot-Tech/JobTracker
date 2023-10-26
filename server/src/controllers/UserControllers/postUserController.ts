import { postUserHelper } from "../../helpers"
import { User } from "@prisma/client"


export const postUserController = async (user: User) => {
    if (typeof user.name !== 'string')  throw new Error('Wrong name type');
    if (typeof user.email !== 'string')  throw new Error('Wrong email type');
    if (typeof user.password !== 'string')  throw new Error('Wrong password type');
    const newUser = await postUserHelper(user);
    if (newUser) return newUser;
    throw Error ('User not found at postUserController');
};