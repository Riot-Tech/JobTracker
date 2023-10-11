import { Response, Request } from "express";
import { getApplicationsController } from "../controllers";



export const getApplicationsHandler = async (req: Request, res: Response) => { //seteamos de tipo any de forma provisoria
    try {
        const allApplications = await getApplicationsController();
        res.status(200).json(allApplications);
    } catch (error) {
        res.status(400).json({error})
    }

}