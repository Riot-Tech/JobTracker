import { getUserByIdHandler } from "../handlers";
import { Response, Request, Router } from "express";

const userRouter = Router();

userRouter.get('/', getUserByIdHandler); //esta es la ruta :id

export default userRouter;