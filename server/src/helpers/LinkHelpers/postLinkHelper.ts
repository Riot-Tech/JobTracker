import { PrismaClient, Link } from "@prisma/client";
const prisma = new PrismaClient();

export const postLinkHelper = async (link: Link) => {
    
    const res = await prisma.link.create({
        data: link
    })

    await prisma.$disconnect();
    if (res){
        return res;
    };

    throw new Error('Error creating link')
}