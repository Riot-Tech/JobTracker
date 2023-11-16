import { PrismaClient, File } from "@prisma/client";
const prisma = new PrismaClient();

export const updateFileHelper = async (file: File) => {

    const res = await prisma.file.update({
        where: { id: file.id },
        data: file,
    });
   
    await prisma.$disconnect();
    if (res) {
        return res;
    }

    throw new Error('Error updating link');
};