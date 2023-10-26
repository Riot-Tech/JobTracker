import { User } from "@prisma/client";
import { updateUserHelper } from "../../helpers";


export const updateUserController = async (user: User) => {
    const updateUser = await updateUserHelper(user);
    return updateUser;
}