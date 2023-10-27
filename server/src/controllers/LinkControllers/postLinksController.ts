import { Link } from "@prisma/client"
import { postLinksHelper } from "../../helpers"


export const postLinksController = async (files: Link[]) => {
    files.forEach(file => {
        if (typeof file.userId !== 'number') throw new Error('Wrong userId type');
        if (typeof file.name !== 'string') throw new Error('Wrong name type');
        if (typeof file.url !== 'string') throw new Error('Wrong url type');
    })

    const newFiles = await postLinksHelper(files);
    if (newFiles) return newFiles;
    throw Error('Files not found at postLinkController');
}