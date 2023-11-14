import { PrismaClient, Link } from "@prisma/client";
const prisma = new PrismaClient();

export const postLinksHelper = async (links: Link[]) => {
    console.log("Llegue al helper con:", links)
    const res = await prisma.link.createMany({
        data: links
    })
    
    const retrievedLinks = await prisma.link.findMany({
        where: {
            userId: links[0].userId
        }
    });

    await prisma.$disconnect();
    if (res){
        return retrievedLinks;
    };

    throw new Error('Error creating link')
}