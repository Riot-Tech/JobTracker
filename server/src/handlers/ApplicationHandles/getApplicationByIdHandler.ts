import { Response, Request } from "express";
import { getApplicationByIdController } from "../../controllers";



export const getApplicationByIdHandler = async (req: Request, res: Response) => { //seteamos de tipo any de forma provisoria
    try {
        const id = +req.body;
        const application = await getApplicationByIdController(id);
        res.status(200).json(application);
    } catch (error) {
        if(error instanceof Error){
        res.status(400).json({ error: error.message })
        }
    }
} 