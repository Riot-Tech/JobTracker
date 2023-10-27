import { Response, Request } from "express";
import { postSpontaneousController } from "../../controllers";



export const postSpontaneousHandler = async (req: Request, res: Response) => { //seteamos de tipo any de forma provisoria
    try {
        const newSponteaneus = req.body;
        const {links} = newSponteaneus;
        const spontaneous = await postSpontaneousController(newSponteaneus, links);
        res.status(200).json(spontaneous);
    } catch (error) {
        if(error instanceof Error){
        res.status(400).json({ error: error.message })
        }
    }
};
