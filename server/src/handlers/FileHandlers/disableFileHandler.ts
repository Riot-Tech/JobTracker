import { Response, Request } from "express";
import { disableFileController } from '../../controllers';

export const disableFileHandler = async (req: Request, res: Response) => {
    try {
        const id = +req.params.id;
        console.log(id)
        if(id){
            const disabledFile = await disableFileController(id);
            return res.status(200).json(disabledFile);
        }
        throw Error("ID not found");
    } catch (error) {
        res.status(400).json(error);
    }
}