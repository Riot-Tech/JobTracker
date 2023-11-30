import { PrismaClient } from "@prisma/client";
import { Storage } from "@google-cloud/storage";
import { deleteFileFromStorage } from "../../utils/cloudUtils";

const prisma = new PrismaClient();

export const disableFileHelper = async (id: number) => {
    
    const res = await prisma.file.delete({
        where:{
            id: id
        },
    })

    await prisma.$disconnect();
    
    if (res){
        let { userId, name } = res;
        
        await deleteFileFromStorage(userId, name)
        return res;
    };
    
    throw new Error('Error deleting file')
};



