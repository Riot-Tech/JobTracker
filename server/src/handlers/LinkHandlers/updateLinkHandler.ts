import { Response, Request } from "express";
import { updateLinkController } from '../../controllers';

export const updateLinkHandler = async (req: Request, res: Response) => {
    try {
        const newLink = req.body;
        const updateLink = await updateLinkController(newLink);
        res.status(200).json(updateLink);
    } catch (error) {
        res.status(400).json({error});
    }
}