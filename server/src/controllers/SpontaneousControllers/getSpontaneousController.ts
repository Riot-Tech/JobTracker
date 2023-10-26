import { getSpontaneousHelper } from "../../helpers"


export const getSpontaneousController = async () => {
    const allSpontaneous = await getSpontaneousHelper();
    if (allSpontaneous) return allSpontaneous;
    throw Error('Spontaneous applications not found at getSpontaneousController');
}