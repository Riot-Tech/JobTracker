import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const getFilesHelper = async (id: number) => {
    const res = await prisma.file.findMany({
        where:{
            userId: id,
            enabled: true
        }
    })

    await prisma.$disconnect();
    if (res){
        return res;
    };

    throw new Error('Files not found')
}