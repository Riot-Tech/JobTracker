import { getUserByIdHandler } from "../handlers";
import { Router } from "express";
import { postUserHandler } from "../handlers/postUserHandler";

const userRouter = Router();

userRouter.get('/:id', getUserByIdHandler);
userRouter.post('/', postUserHandler);

export default userRouter;