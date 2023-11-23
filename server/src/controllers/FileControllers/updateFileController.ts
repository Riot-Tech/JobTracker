import { File } from "@prisma/client"
import { updateFileHelper } from "../../helpers"


export const updateFileController = async (file: File) => {
    if (typeof file.userId !== 'number') throw new Error('Wrong userId type');
    if (typeof file.name !== 'string') throw new Error('Wrong name type');
    if (typeof file.url !== 'string') throw new Error('Wrong url type');

    const updatedFile = await updateFileHelper(file);
    if (updatedFile) return updatedFile;
    throw Error('Link not found at updateFileController');
    }
