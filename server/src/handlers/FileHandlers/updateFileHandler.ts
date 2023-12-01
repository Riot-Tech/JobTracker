import { Response, Request } from "express";
import { updateFileController } from '../../controllers';

export const updateFileHandler = async (req: Request, res: Response) => {
    try {
        const file = req.body;
        const updatedFile = await updateFileController(file);
        res.status(200).json(updatedFile);
    } catch (error) {
        res.status(400).json(error);
    }
}