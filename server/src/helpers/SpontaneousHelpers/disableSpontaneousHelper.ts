import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const disableSpontaneousHelper = async (id: number) => {
    const res = await prisma.spontaneous.update({
        where:{
            id: id
        },
        data: { enabled: false}
    })

    await prisma.$disconnect();
    if (res){
        return res;
    };

    throw new Error('Error updating the spontaneous application')
}