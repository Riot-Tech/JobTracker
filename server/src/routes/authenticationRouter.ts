import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'
dotenv.config()

const authRouter: Router = Router();
const prisma = new PrismaClient();
const key = process.env.JWT_KEY

authRouter.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body as {email: string, password: string};
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({ error: "User doesn't exist" });
    }

    if (bcrypt.compareSync(password, user.password)) { //si son iguales
      const token = jwt.sign(user, key as string, {expiresIn: '3h'})
      return res.status(200).json({message: "Login success", token: token });
    }else{
      return res.status(400).json({message: "Invalid credentials"});
    }
  } catch (error) {
    /* console.log(error) */
    return res.status(400).json({message: 'Error during login, try again later'})
  }
});

export default authRouter;
