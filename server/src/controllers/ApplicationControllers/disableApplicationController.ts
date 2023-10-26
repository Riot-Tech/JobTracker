import { disableApplicationHelper } from "../../helpers"


export const disableApplicationController = async (id: number) => {
    if (typeof id !== 'number') throw new Error('Wrong ID type');
    const disabledApplication = await disableApplicationHelper(id);
    if (disabledApplication) return disabledApplication;
    throw Error('Disabled application not found at disableApplicationController');
}