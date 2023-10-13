import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();



export const postUserHelper = async (user: User) => {
    const res = await prisma.user.create({
        data: user
    })

    await prisma.$disconnect();
    if (res){
        return res;
    };

    throw new Error('Error creating the user')
}