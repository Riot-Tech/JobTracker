import { PrismaClient, Application } from "@prisma/client";
const prisma = new PrismaClient();

export const updateApplicationHelper = async (application: Application) => {
    const res = await prisma.application.update({
        where:{
            id: application.id
        },
        data: application
    })

    await prisma.$disconnect();
    if (res){
        return res;
    };

    throw new Error('Error updating the application')
}