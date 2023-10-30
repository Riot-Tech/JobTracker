import { Response, Request } from "express";
import { getSpontaneousController } from "../../controllers";



export const getSpontaneousHandler = async (req: Request, res: Response) => { //seteamos de tipo any de forma provisoria
    try {
        const id = +req.params;
        if(id){
            const allSpontaneous = await getSpontaneousController(id);
            return res.status(200).json(allSpontaneous);
        }
        throw Error('ID not found');
    } catch (error) {
        if(error instanceof Error){
        res.status(400).json({ error: error.message })
        }
    }
}