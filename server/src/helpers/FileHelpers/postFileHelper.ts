import { PrismaClient, File } from "@prisma/client";
const prisma = new PrismaClient();

export const postFileHelper = async (file: File) => {
    const res = await prisma.file.create({
        data: file
    })

    await prisma.$disconnect();
    if (res){
        return res;
    };

    throw new Error('Error creating file')
}