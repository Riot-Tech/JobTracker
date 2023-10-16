import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();
import * as bcrypt from "bcrypt";



export const postUserHelper = async (user: User) => {
    const { email, name, password } = user
    // Hashea la contraseña
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    const res = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hash,
      },
    });
    await prisma.$disconnect();
    if (res){
        return res;
    };

    throw new Error('Error creating the user')
}