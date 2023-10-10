import { PrismaClient, Application } from "@prisma/client";
const prisma = new PrismaClient();

export const getApplicationHelper = async () => {
    const res = await prisma.application.findMany()

    await prisma.$disconnect();
    if (res){
        return res;
    };

    throw new Error('Applications not found')
}