import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getApplicationByIdHelper = async (id: number) => {
    const res = await prisma.application.findUnique({
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

    throw new Error('Applications not found')
}