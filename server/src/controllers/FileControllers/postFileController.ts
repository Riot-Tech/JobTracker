import { File } from "@prisma/client"
import { postFileHelper } from "../../helpers";
import { UploadedFile } from "../../types";
import { uploadFile } from "../../utils/cloudUtils";


export const postFileController = async (fileData: File, file: UploadedFile) => {
    if (typeof fileData.userId !== 'number') throw new Error('Wrong userId type');
    if (typeof fileData.name !== 'string') throw new Error('Wrong name type');
    if (typeof fileData.url !== 'string') throw new Error('Wrong url type');
    if (!file) throw new Error("No file received (at postLinksController)");


    try {
        // Intento subir el archivo a Google Cloud
        const cloudUrl = await uploadFile(file, fileData.userId);
        if (cloudUrl) {
            // Guardo la nueva url en la data del archivo
            fileData.url = cloudUrl;
            // Creo el registro en la base de datos
            const newFile = await postFileHelper(fileData);
            if (newFile) return newFile;
            throw Error ("Error posting file (at postFileController");
        }
        throw Error("No valid cloudUrl received from GCS (at postFileController)");

    } catch (error) {
        console.error(error);
    }
}