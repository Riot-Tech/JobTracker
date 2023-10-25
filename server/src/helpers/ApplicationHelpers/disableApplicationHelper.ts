import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const disableApplicationHelper = async (id: number) => {
    const res = await prisma.application.update({
        where:{
            id: id
        },
        data: { enabled: false}
    })

    await prisma.$disconnect();
    if (res){
        return res;
    };

    throw new Error('Error updating the application')
}