import { disableSpontaneousHelper } from "../../helpers"


export const disableSpontaneousController = async (id: number) => {
    if(typeof id !== 'number') throw new Error('Wrong ID type');
    const disabledSpontaneous = await disableSpontaneousHelper(id);
    if (disabledSpontaneous) return disabledSpontaneous;
    throw Error('Spontaneous application not found at disableSpontaneousController');
}