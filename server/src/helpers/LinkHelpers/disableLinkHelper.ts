import { PrismaClient, Link } from "@prisma/client";
const prisma = new PrismaClient();

export const disableLinkHelper = async (id: number) => {
    
    const res = await prisma.link.update({
        where:{
            id: id
        },
        data: {enabled: false}
    })

    await prisma.$disconnect();
    if (res){
        return res;
    };

    throw new Error('Error disabling link')
}