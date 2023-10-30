import { Response, Request } from "express";
import { getApplicationByIdController } from "../../controllers";



export const getApplicationByIdHandler = async (req: Request, res: Response) => { //seteamos de tipo any de forma provisoria
    try {
        const id = +req.params.id;

        if(id){
            const application = await getApplicationByIdController(id);
            return res.status(200).json(application);
        }
        throw Error('ID not found');
    } catch (error) {
        if(error instanceof Error){
        res.status(400).json({ error: error.message })
        }
    }
} 