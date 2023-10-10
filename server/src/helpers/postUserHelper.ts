import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type User = {
    id: number;
    name: string;
    email: string;
    password: string;
};

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