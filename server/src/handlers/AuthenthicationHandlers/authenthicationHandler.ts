import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient();
const key = process.env.JWT_KEY

export const authenticationHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };
  try {
    if(req.body.googleId){ // si tiene google Id
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if(!user){
        const user = await prisma.user.create({
          data: {
            name: req.body.name,
            email: email,
            password: req.body.googleId,
          },
        })
        const token = jwt.sign(user, key as string, { expiresIn: "3h" });
        return res.status(200).json({...user, token, password:''})
      }
      const token = jwt.sign(user, key as string, { expiresIn: "3h" });
      return res.status(200).json({...user, token, password:''})
    }else{
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });
  
      if (!user) {
        return res.status(400).json({ message: "User doesn't exist" });
      }
  
      if (bcrypt.compareSync(password, user.password)) { //si son iguales
        const token = jwt.sign(user, key as string, { expiresIn: "3h" });
        return res.status(200).json({ message: "Login success", user:{...user ,id: user.id, email: user.email, name: user.name, enabled: user.enabled, token: token} });
      } else {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error during login, try again later" });
  }
};
