import { Response, Request } from "express";
import { viewFileController } from '../../controllers';

export const viewFileHandler = async (req: Request, res: Response) => {
  try {
    const userId = +req.params.id;
    const { filename } = req.query;

    if (filename && typeof(filename) === 'string') {
        const signedUrl = await viewFileController(filename, userId);
        if (signedUrl) return res.status(200).send(signedUrl);
    };
    return res.status(400).send("Wrong filename type");

  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  };
};