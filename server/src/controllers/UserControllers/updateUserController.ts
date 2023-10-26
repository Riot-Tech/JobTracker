import { User } from "@prisma/client";
import { updateUserHelper } from "../../helpers";


export const updateUserController = async (user: User) => {
    if (typeof user.name !== 'string')  throw new Error('Wrong name type');
    if (typeof user.email !== 'string')  throw new Error('Wrong email type');
    if (typeof user.password !== 'string')  throw new Error('Wrong password type');
    const updatedUser = await updateUserHelper(user);
    if (updatedUser) return updatedUser;
    throw Error ('Updated user not found at postUserController');
}