import { PrismaClient } from "@prisma/client";
import { User } from "../types";
const prisma = new PrismaClient();



export const postUserHelper = async (user: User) => {
    const res = await prisma.user.create({
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password
        }
    })

    await prisma.$disconnect();
    if (res){
        return res;
    };

    throw new Error('Error creating the user')
}