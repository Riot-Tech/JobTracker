import { disableFileHelper } from "../../helpers"


export const disableFileController = async (id: number) => {
    if (typeof id !== 'number') throw new Error('Wrong ID type');
    const disabledFile = await disableFileHelper(id);
    if (disabledFile) return disabledFile;
    throw Error('Link not found at disableFileController');
}