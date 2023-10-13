import { Response, Request } from "express";
import { postUserController } from "../controllers";



export const postUserHandler = async (req: Request, res: Response) => { //seteamos de tipo any de forma provisoria
    try {
        const newUser = req.body;
        const user = await postUserController(newUser);
        res.status(200).json(user);
    } catch (error) {
        if(error instanceof Error)
            res.status(400).json(error.message);
    };
};
