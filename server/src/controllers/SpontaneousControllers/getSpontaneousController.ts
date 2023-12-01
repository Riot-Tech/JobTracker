import { getSpontaneousHelper } from "../../helpers"


export const getSpontaneousController = async (id: number) => {
    if (typeof id !== 'number') throw new Error('Wrong ID type');
    const allSpontaneous = await getSpontaneousHelper(id);
    if (allSpontaneous) return allSpontaneous;
    throw Error('Spontaneous applications not found at getSpontaneousController');
}