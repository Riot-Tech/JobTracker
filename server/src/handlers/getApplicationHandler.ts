import { Response, Request } from "express";
import { getApplicationController } from "../controllers";



export const getApplicationHandler = async (req: Request, res: Response) => { //seteamos de tipo any de forma provisoria
    try {
        const allApplications = await getApplicationController();
        res.status(200).json(allApplications);
    } catch (error) {
        res.status(400).json({error})
    }

}