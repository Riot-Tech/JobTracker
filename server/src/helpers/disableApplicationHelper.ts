import { PrismaClient, Application } from "@prisma/client";
const prisma = new PrismaClient();

export const disableApplicationHelper = async (id: number, application: Application) => {
    const res = await prisma.application.update({
        where:{
            id: id
        },
        data: { enabled: application.enabled}
    })

    await prisma.$disconnect();
    if (res){
        return res;
    };

    throw new Error('Error updating the application')
}