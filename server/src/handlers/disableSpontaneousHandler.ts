import { Response, Request } from "express";
import { disableSpontaneousController } from "../controllers";



export const disableSpontaneousHandler = async (req: Request, res: Response) => { //seteamos de tipo any de forma provisoria
    try {
        const idSpontaneous = +req.params.id;
        const disableSpontaneous = await disableSpontaneousController(idSpontaneous)
        res.status(200).json(disableSpontaneous);
    } catch (error) {
        if(error instanceof Error){
        res.status(400).json({ error: error.message })
        }
    }
}