import { Response, Request } from "express";
import { getFilesController } from '../../controllers';

export const getFilesHandler = async (req: Request, res: Response) => {
    try {
        const allFiles = await getFilesController();
        res.status(200).json(allFiles);
    } catch (error) {
        res.status(400).json(error);
    }
}