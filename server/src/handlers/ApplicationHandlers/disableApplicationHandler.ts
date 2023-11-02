import { Response, Request } from "express";
import { disableApplicationController } from "../../controllers";



export const disableApplicationHandler = async (req: Request, res: Response) => { //seteamos de tipo any de forma provisoria
    try {
        const id = +req.params.id;
        if(id){
            const disableApplication = await disableApplicationController(id)
            return res.status(200).json(disableApplication);
        }
        throw Error('ID not found');
    } catch (error) {
        if(error instanceof Error){
        res.status(400).json({ error: error.message })
        }
    }
}