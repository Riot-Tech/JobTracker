import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getSpontaneousByIdHelper = async (id: number) => {
    const res = await prisma.spontaneous.findUnique({
        where:{
            id: id,
            enabled: true
        },
        include:{
            links: true
        }
    })

    await prisma.$disconnect();
    if (res){
        return res;
    };

    throw new Error('Spontaneous not found')
}