import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserByIdHelper = async (id: number) => {
    const searchedUser = await prisma.user.findUnique({
        where: { id: +id }
    })
    await prisma.$disconnect();
    if (searchedUser){
        return searchedUser;
    };

    throw new Error('User Id not found')
}   