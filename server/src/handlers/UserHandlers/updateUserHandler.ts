import { Response, Request } from "express";
import { updateUserController } from "../../controllers";



export const updateUserHandler = async (req: Request, res: Response) => { //seteamos de tipo any de forma provisoria
    try {
        const user = req.body;
        const updateUser = await updateUserController(user);
        res.status(200).json(updateUser);
    } catch (error) {
        if(error instanceof Error){
        res.status(400).json({ error: error.message })
        }
    }
}