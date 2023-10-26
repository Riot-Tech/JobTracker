import { Response, Request } from "express";
import { getSpontaneousController } from "../../controllers";



export const getSpontaneousHandler = async (req: Request, res: Response) => { //seteamos de tipo any de forma provisoria
    try {
        const allSpontaneous = await getSpontaneousController();
        res.status(200).json(allSpontaneous);
    } catch (error) {
        if(error instanceof Error){
        res.status(400).json({ error: error.message })
        }
    }
}