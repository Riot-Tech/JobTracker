import { Response, Request } from "express";
import { downloadFileController } from '../../controllers';

export const downloadFileHandler = async (req: Request, res: Response) => {
  try {
    const userId = +req.params.id;
    const { filename } = req.query;

    if (filename && typeof(filename) === 'string') {
        const response = await downloadFileController(filename, userId);
        if (response) return res.status(200).send(response);
    };
    return res.status(400).send("Wrong filename type");

  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  };
};