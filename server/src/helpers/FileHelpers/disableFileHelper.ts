import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const disableFileHelper = async (id: number) => {
    
    const res = await prisma.file.update({
        where:{
            id: id
        },
        data: {enabled: false}
    })

    await prisma.$disconnect();
    if (res){
        return res;
    };

    throw new Error('Error disabling file')
}