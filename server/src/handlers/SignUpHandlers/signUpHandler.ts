import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { Resend } from 'resend';
import * as dotenv from 'dotenv'

dotenv.config()
const key = process.env.RESEND_KEY
const prisma = new PrismaClient();
const resend = new Resend(key);

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
  
      resend.emails.send({
        from: 'jobTracker@resend.dev',
        to: email,
        subject: 'JobTracker',
        html: '<p>Thank you for suscribing to <strong>Job Tracker</strong>!</p>'
      });
      return res.status(200).json(newUser);
    }
    return res.status(400).send({ message: "User already exists" })
  } catch (error) {
        console.log(error)
  }
};
