import { getFilesHelper } from "../../helpers"


export const getFilesController = async () => {
    const allFiles = await getFilesHelper();
    if (allFiles) return allFiles;
    throw Error('Links not found at getFilesController');
}