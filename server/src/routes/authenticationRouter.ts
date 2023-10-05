import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const authRouter: Router = Router();
const prisma = new PrismaClient();

authRouter.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;
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
      return res.status(200).json("Login success");
    }
  } catch (error) {
    console.log(error)
  }
});

export default authRouter;
