import { getUserByIdHelper, getLinksHelper } from "../../helpers"

export const getUserByIdController = async (id: number) => {
    if(typeof id !== 'number') throw new Error('Wrong ID type')

    const user = await getUserByIdHelper(id);

    return user;
}