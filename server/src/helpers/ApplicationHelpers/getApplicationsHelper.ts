import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getApplicationsHelper = async (id: number) => {
    const res = await prisma.application.findMany({
        where:{
            userId: id,
            enabled: true
        }
    })

    await prisma.$disconnect();
    if (res){
        return res;
    };

    throw new Error('Applications not found')
}