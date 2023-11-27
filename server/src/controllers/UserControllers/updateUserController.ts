import { User } from "@prisma/client";
import { updateUserHelper } from "../../helpers";


export const updateUserController = async (user: User) => {
    if (typeof user.name !== 'string')  throw new Error('Wrong name type');
    if (typeof user.email !== 'string')  throw new Error('Wrong email type');
    if (typeof user.password !== 'string')  throw new Error('Wrong password type');
    if (user.linkedIn && typeof user.linkedIn !== 'string')  throw new Error('Wrong linkedIn link type');
    if (user.gitHub && typeof user.gitHub !== 'string')  throw new Error('Wrong gitHub link type');
    if (user.portfolio && typeof user.portfolio !== 'string')  throw new Error('Wrong portfolio link type');

    const updatedUser = await updateUserHelper(user);
    if (updatedUser) return updatedUser;
    throw Error ('User not found at postUserController');
}