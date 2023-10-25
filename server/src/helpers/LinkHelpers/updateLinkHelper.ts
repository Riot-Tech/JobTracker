import { PrismaClient, Link } from "@prisma/client";
const prisma = new PrismaClient();

export const updateLinkHelper = async (link: Link) => {
    
    const res = await prisma.link.update({
        where:{
            id: link.id
        },
        data: link
    })

    await prisma.$disconnect();
    if (res){
        return res;
    };

    throw new Error('Error updating link')
}