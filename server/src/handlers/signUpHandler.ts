import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const signUpHandler = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    // Hashea la contraseña
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hash,
      },
    });

    return res.status(200).json(user);
  } catch (error) {
        console.log(error)
  }
};
