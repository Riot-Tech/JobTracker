import { Response, Request } from "express";
import { updateApplicationController } from "../controllers";



export const updateApplicationHandler = async (req: Request, res: Response) => { //seteamos de tipo any de forma provisoria
    try {
        const application = req.body;
        const updateApplication = await updateApplicationController(application);
        res.status(200).json(updateApplication);
    } catch (error) {
        res.status(400).json({error})
    }
}