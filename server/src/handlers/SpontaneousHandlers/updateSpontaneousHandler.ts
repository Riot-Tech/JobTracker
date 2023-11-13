import { Response, Request } from "express";
import { updateSpontaneousController } from "../../controllers";



export const updateSpontaneousHandler = async (req: Request, res: Response) => { //seteamos de tipo any de forma provisoria
    try {
        const { links, ...spontaneous } = req.body;
        
        const updateSpontaneous = await updateSpontaneousController(spontaneous, links);
        res.status(200).json(updateSpontaneous);
    } catch (error) {
        if(error instanceof Error){
        res.status(400).json({ error: error.message })
        }
    }
}