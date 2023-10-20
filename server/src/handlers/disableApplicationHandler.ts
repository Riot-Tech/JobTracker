import { Response, Request } from "express";
import { disableApplicationController } from "../controllers";



export const disableApplicationHandler = async (req: Request, res: Response) => { //seteamos de tipo any de forma provisoria
    try {
        const idApplication = +req.params.id;
        const disableApplication = await disableApplicationController(idApplication)
        res.status(200).json(disableApplication);
    } catch (error) {
        if(error instanceof Error){
        res.status(400).json({ error: error.message })
        }
    }

}