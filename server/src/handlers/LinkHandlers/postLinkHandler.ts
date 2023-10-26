import { Response, Request } from "express";
import { postLinkController } from '../../controllers';

export const postLinkHandler = async (req: Request, res: Response) => {
    try {
        const newLink = req.body;
        const postLink = await postLinkController(newLink);
        res.status(200).json(postLink);
    } catch (error) {
        res.status(400).json({error});
    }
}