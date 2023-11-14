// import { Response, Request } from "express";
// import { postLinksController } from '../../controllers';

// export const postLinksHandler = async (req: Request, res: Response) => {
//     try {
//         const newFiles = req.body;
//         console.log(newFiles)
//         const postedFiles = await postLinksController(newFiles);
//         res.status(200).json(postedFiles);
//     } catch (error) {
//         res.status(400).json({error});
//     }
// }