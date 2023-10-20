import { getUserByIdHelper } from "../helpers"

export const getUserByIdController = async (id: number) => {
    if(isNaN(id)){
        throw new Error('Wrong ID type')
    }
    const res = await getUserByIdHelper(id);
    console.log(res)
    return res;
}