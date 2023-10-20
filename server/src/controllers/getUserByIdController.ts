import { getUserByIdHelper } from "../helpers"

export const getUserByIdController = async (id: number) => {
    if(typeof id !== 'number'){
        throw new Error('Wrong ID type')
    }
    const res = await getUserByIdHelper(id);
    return res;
}