import { Response, Request } from "express";
import { getUserByIdController } from "../../controllers";



export const getUserByIdHandler = async (req: Request, res: Response) => { //seteamos de tipo any de forma provisoria
    try {
        const id = +req.params;
        if(id){
            const user = await getUserByIdController(id);
            return res.status(200).json(user);
        }
        throw Error('ID not found')
    } catch (error) {
        if(error instanceof Error){
        res.status(400).json({ error: error.message })
        }
    }
}


