import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getApplicationsHelper = async () => {
    const res = await prisma.application.findMany({
        where:{
            enabled: true
        }
    })

    await prisma.$disconnect();
    if (res){
        return res;
    };

    throw new Error('Applications not found')
}