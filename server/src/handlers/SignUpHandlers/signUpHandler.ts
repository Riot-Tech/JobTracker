import * as dotenv from 'dotenv'
import * as bcrypt from "bcrypt";
import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { transporter } from "../../utils/mailer";

dotenv.config()
const key = process.env.RESEND_KEY
const prisma = new PrismaClient();

export const signUpHandler = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    // Hashea la contraseña
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    
    const user = await prisma.user.findFirst({where: {email}})
    if(!user){
      const newUser = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hash,
        },
      });
      
      await transporter.sendMail({
        from: '"JobTracker 👻" <JobTracker@gmail.com>',
        to: email,
        subject: "Account created",
        html: "<b>Congratulations! Your account was successfully created.</b>",
      });

      return res.status(200).json(newUser);
    }
    return res.status(400).json({ message: "User already exists" })
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error during sign up, try again later" });
  }
};
