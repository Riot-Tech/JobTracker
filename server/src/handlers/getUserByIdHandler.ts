import { Response, Request } from "express";
import { getUserByIdController } from "../controllers";



export const getUserByIdHandler = async (req: Request, res: Response) => { //seteamos de tipo any de forma provisoria
    try {
        const userId = +req.params.id;
        const user = await getUserByIdController(userId);
        res.status(200).json(user);
    } catch (error) {
        if(error instanceof Error)
            res.status(400).json(error)
    }

}


