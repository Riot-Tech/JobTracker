
import { PrismaClient, Spontaneous } from "@prisma/client";
const prisma = new PrismaClient();


export const postSpontaneousHelper = async (spontaneous: Spontaneous) => {
    const res = await prisma.spontaneous.create({
        data: spontaneous
    })

    await prisma.$disconnect();
    if (res){
        return res;
    };

    throw new Error('Error creating the spontaneous application')
}