// import { Response, Request } from "express";
// import { disableLinkController } from '../../controllers';

// export const disableLinkHandler = async (req: Request, res: Response) => {
//     try {
//         const id = +req.params;
//         if(id){
//             const disabledLink = await disableLinkController(id);
//             return res.status(200).json(disabledLink);
//         }
//         throw Error("ID not found");
//     } catch (error) {
//         res.status(400).json({error});
//     }
// }