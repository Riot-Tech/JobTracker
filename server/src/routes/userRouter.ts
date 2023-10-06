import { getUserByIdHandler } from "../handlers";
import { Response, Request, Router } from "express";
import { postUserHandler } from "../handlers/postUserHandler";

const userRouter = Router();

userRouter.get('/:id', getUserByIdHandler); //esta es la ruta :id, falta agregarlo en el path
userRouter.post('/', postUserHandler);

export default userRouter;