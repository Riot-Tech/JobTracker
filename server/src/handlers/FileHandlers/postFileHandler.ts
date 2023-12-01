import { Response, Request } from "express";
import { postFileController } from '../../controllers';

export const postFileHandler = async (req: Request, res: Response) => {
    try {
        // Extraigo el archivo y la data asociada
        const fileData = JSON.parse(req.body.data);
        const file = req.file;

        if (!fileData) return res.status(400).send("No Link data received (at handler)");
        if (!file) return res.status(400).send("No file received (at postLinksHandler)");
        
        const postedFiles = await postFileController(fileData, file);
        if (postedFiles) return res.status(200).json(postedFiles);

    } catch (error) {
        return res.status(400).json(error);
    }
}