import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
/* import bcrypt from 'bcrypt'; */

const authRouter: Router = Router();
const prisma = new PrismaClient();

authRouter.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // console.log(email)
    // if(email) res.status(200).send(email)

   /*  const user = await prisma.user.findUnique({
        where: { 
          email
        },
      }); */

      /* if (!user) {
        return res.status(400).json({ error: "User doesn't exist" });
      } */

  } catch (error) {

  }
});

export default authRouter