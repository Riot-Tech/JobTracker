import { PrismaClient, Application } from "@prisma/client";
const prisma = new PrismaClient();

export const postApplicationHelper = async (application: Application) => {
    
    const res = await prisma.application.create({
        data: application
    })

    await prisma.$disconnect();
    if (res){
        return res;
    };

    throw new Error('Error creating the application')
}