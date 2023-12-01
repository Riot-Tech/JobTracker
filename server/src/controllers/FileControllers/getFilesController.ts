import { getFilesHelper } from "../../helpers"


export const getFilesController = async (id: number) => {
    if (typeof id !== 'number') throw new Error('Wrong ID type');
    const allFiles = await getFilesHelper(id);
    if (allFiles) return allFiles;
    throw Error('Links not found at getFilesController');
}