import { Response, Request } from "express";
import { postSpontaneusController } from "../controllers";



export const postSpontaneusHandler = async (req: Request, res: Response) => { //seteamos de tipo any de forma provisoria
    try {
        const newSponteaneus = req.body;
        const spontaneous = await postSpontaneusController(newSponteaneus);
        res.status(200).json(spontaneous);
    } catch (error) {
        if(error instanceof Error)
            res.status(400).json(error.message);
    };

};
