import { File } from "@prisma/client"
import { postFileHelper } from "../../helpers";
import { UploadedFile } from "../../types";
import { uploadFile, checkFileExistence } from "../../utils/cloudUtils";


export const postFileController = async (fileData: File, file: UploadedFile) => {
    if (typeof fileData.userId !== 'number') throw new Error('Wrong userId type');
    if (typeof fileData.name !== 'string') throw new Error('Wrong name type');
    if (typeof fileData.url !== 'string') throw new Error('Wrong url type');
    if (!file) throw new Error("No file received (at postLinksController)");


    try {
        // Primero chequeo si el archivo ya existia en Google Cloud
        const fileExisted = await checkFileExistence(file.originalname, fileData.userId);
        
        if (!fileExisted) {
            // Intento subir el archivo a Google Cloud
            const cloudUrl = await uploadFile(file, fileData.userId);
            if (!cloudUrl) {
                throw Error("No valid cloudUrl received from GCS (at postFileController)");
            }
            // Guardo la nueva url en la data del archivo
            fileData.url = cloudUrl;

            // Creo el registro en la base de datos
            const newFile = await postFileHelper(fileData);
            if (newFile) return newFile;
            throw Error ("Error posting file (at postFileController");
        };
        throw Error ("File already existed in Cloud Storage");
    } catch (error) {
        console.error(error);
        throw error;
    }
}