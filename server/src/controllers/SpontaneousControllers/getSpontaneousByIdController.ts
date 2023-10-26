import { getSpontaneousByIdHelper } from "../../helpers"


export const getSpontaneousByIdController = async (id: number) => {
    if(typeof id !== 'number') throw new Error('Wrong ID type');
    const spontaneous = await getSpontaneousByIdHelper(id);
    if (spontaneous) return spontaneous;
    throw Error('Spontaneous not found at getSpontaneousByIdController');
}