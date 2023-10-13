import { Response, Request } from "express";
import { postApplicationController } from "../controllers";



export const postApplicationHandler = async (req: Request, res: Response) => { //seteamos de tipo any de forma provisoria
    try {
        const newApplication = req.body;
        const application = await postApplicationController(newApplication);
        res.status(200).json(application);
    } catch (error) {
        res.status(400).json({error})
    }

}