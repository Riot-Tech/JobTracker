import { getUserByIdHelper } from "../../helpers"


export const getUserByIdController = async (id: number) => {
    if (typeof id !== 'number') throw new Error('Wrong ID type');
    const user = await getUserByIdHelper(id);
    if (user) return user;
    throw Error('User not found at getUserByIdController');
}