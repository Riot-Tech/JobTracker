import { Response, Request } from "express";
import { postLinksController } from '../../controllers';

export const postLinksHandler = async (req: Request, res: Response) => {
    try {
        //!no sirve
        // console.log("ENTRE AL HANDLER");
        // const fileData = JSON.parse(req.body.data);
        // // const fileData = req.body.data;
        // const file = req.files;
        // console.log(" FILE handler", file)
        // if (file && !Array.isArray(file)) {
        //     console.log("FILEDATA handler", fileData);
        //     console.log(" FILE handler", file)
        //     const postedFiles = await postLinksController(fileData, file);
        //     res.status(200).json(postedFiles);
            
        // }

        console.log("ENTRE AL HANDLER");
        console.log("fileeee", req.file);
        const file = req.file;
        const linkData = JSON.parse(req.body.data);
        console.log("LINKDATA", linkData);
        if (!file) {
            return res.status(400).send("No file received (at postLinksHandler)");
        };
        if (!linkData) {
            return res.status(400).send("No Link data received (at handler)");
        };
        
        const postedFiles = await postLinksController(linkData, file);
        if (postedFiles) {
            return res.status(200).json(postedFiles);
        };
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
}