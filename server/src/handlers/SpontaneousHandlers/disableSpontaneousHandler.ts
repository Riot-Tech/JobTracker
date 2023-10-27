import { Response, Request } from "express";
import { disableSpontaneousController } from "../../controllers";



export const disableSpontaneousHandler = async (req: Request, res: Response) => { //seteamos de tipo any de forma provisoria
    try {
        const id = +req.params;
        if(id){
            const disableSpontaneous = await disableSpontaneousController(id)
            return res.status(200).json(disableSpontaneous);
        }
        throw Error('ID not found');
    } catch (error) {
        if(error instanceof Error){
        res.status(400).json({ error: error.message })
        }
    }
}