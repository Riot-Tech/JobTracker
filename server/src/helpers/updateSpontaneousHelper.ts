import { PrismaClient, Spontaneous } from "@prisma/client";
const prisma = new PrismaClient();

export const updateSpontaneousHelper = async (spontaneous: Spontaneous) => {
    const res = await prisma.spontaneous.update({
        where:{
            id: spontaneous.id
        },
        data: spontaneous
    })

    await prisma.$disconnect();
    if (res){
        return res;
    };

    throw new Error('Error updating the spontaneous application')
}