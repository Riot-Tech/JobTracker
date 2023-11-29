import { PrismaClient } from "@prisma/client";
import { Storage } from "@google-cloud/storage";

const prisma = new PrismaClient();
const storage = new Storage();

export const disableFileHelper = async (id: number) => {
    
    const res = await prisma.file.delete({
        where:{
            id: id
        },
    })

    await prisma.$disconnect();
    if (res){
        console.log(res)
        return res;
    };

    throw new Error('Error deleting file')
}

// export const deleteFileFromStorage = async (storagePath: string) => {
//     try {

//       // Elimina el archivo del almacenamiento de Google Cloud Storage
//       await storage.bucket(bucketName).file(storagePath).delete();
//     } catch (error) {
//       console.error('Error deleting file from storage', error);
//       throw new Error('Error deleting file from storage');
//     }
//   };