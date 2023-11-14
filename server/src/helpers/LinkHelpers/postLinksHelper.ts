import { PrismaClient, Link } from "@prisma/client";
const prisma = new PrismaClient();

export const postLinksHelper = async (links: Link[]) => {
    console.log("Llegue al helper con:", links)
    const res = await prisma.link.createMany({
        data: links
    })

    await prisma.$disconnect();
    if (res){
        return res;
    };

    throw new Error('Error creating link')
}