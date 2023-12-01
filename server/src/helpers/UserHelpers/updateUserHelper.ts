import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();


export const updateUserHelper = async (user: User) => {
    const res = prisma.user.update({
        where:{
            id: user.id
        },
        data: user
    });
    await prisma.$disconnect();
    if (res){
        console.log(res)
        return res;
    };

    throw new Error('Error updating the user')
}