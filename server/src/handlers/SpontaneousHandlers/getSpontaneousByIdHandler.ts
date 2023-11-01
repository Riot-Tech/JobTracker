import { Response, Request } from "express";
import { getSpontaneousByIdController } from "../../controllers";



export const getSpontaneousByIdHandler = async (req: Request, res: Response) => { //seteamos de tipo any de forma provisoria
    try {
        const id = +req.params;
        if(id){
            const spontaneous = await getSpontaneousByIdController(id);
            return res.status(200).json(spontaneous);
        }
        throw Error ("ID not found");
    } catch (error) {
        if(error instanceof Error){
        res.status(400).json({ error: error.message })
        }
    }
}