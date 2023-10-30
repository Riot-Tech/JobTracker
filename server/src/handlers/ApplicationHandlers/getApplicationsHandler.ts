import { Response, Request } from "express";
import { getApplicationsController } from "../../controllers";



export const getApplicationsHandler = async (req: Request, res: Response) => { //seteamos de tipo any de forma provisoria
    try {
        const id = req.query.id;
        if(id){
            const allApplications = await getApplicationsController(+id);
            return res.status(200).json(allApplications);
        }
        throw Error('ID not found');
    } catch (error) {
        if(error instanceof Error){
        res.status(400).json({ error: error.message })
        }
    }
}