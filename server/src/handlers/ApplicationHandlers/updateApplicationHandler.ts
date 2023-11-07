import { Response, Request } from "express";
import { updateApplicationController } from "../../controllers";



export const updateApplicationHandler = async (req: Request, res: Response) => { //seteamos de tipo any de forma provisoria
    try {
        const {links, ...application} = req.body;
        const updateApplication = await updateApplicationController(application, links);
        res.status(200).json(updateApplication);
    } catch (error) {
        if(error instanceof Error){
        res.status(400).json({ error: error.message })
        }
    }
}