import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const getLinksHelper = async () => {
    const res = await prisma.link.findMany({
        where:{
            enabled: true
        }
    })

    await prisma.$disconnect();
    if (res){
        return res;
    };

    throw new Error('Error getting all links')
}