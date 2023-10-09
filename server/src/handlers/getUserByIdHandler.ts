import { Response, Request } from "express";
import { getUserByIdController } from "../controllers";



export const getUserByIdHandler = async (req: Request, res: Response) => { //seteamos de tipo any de forma provisoria
    try {
        const userId = +req.params.id;
        const user = getUserByIdController(userId);
        res.status(200).send(user);
    } catch (error) {
        res.status(400).json(error)
    }

}


