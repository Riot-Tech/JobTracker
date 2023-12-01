import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getSpontaneousHelper = async (id: number) => {
    const res = await prisma.spontaneous.findMany({
        where:{
            userId: id,
            enabled: true
        },
    })

    await prisma.$disconnect();
    if (res){
        return res;
    };

    throw new Error('Spontaneous not found')
}