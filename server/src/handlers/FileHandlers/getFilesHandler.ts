import { Response, Request } from "express";
import { getFilesController } from '../../controllers';

export const getFilesHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.query;
        if (!id) throw Error("No user id received (at handler)");
        const allFiles = await getFilesController(+id);
        res.status(200).json(allFiles);
    } catch (error) {
        res.status(400).json(error);
    }
}