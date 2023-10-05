import { getUserByIdHandler } from "../handlers";
import { Response, Request, Router } from "express";

const userRouter = Router();

userRouter.get('/:id', (req: Request, res: Response) => { 
    const userId = req.params.id;
    const user = getUserByIdHandler();
    res.json(user);
});

export {userRouter};