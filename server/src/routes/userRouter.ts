import { Router } from "express";
import { getUserByIdHandler, postUserHandler, updateUserHandler } from "../handlers";

const userRouter = Router();

userRouter.get('/:id', getUserByIdHandler);
userRouter.post('/', postUserHandler);
userRouter.patch('/', updateUserHandler);

export default userRouter;