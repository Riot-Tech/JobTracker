import { getUserByIdHelper } from "../helpers"

export const getUserByIdController = async (id: number) => {
    const res = await getUserByIdHelper(id);
    console.log(res)
    return res;
}