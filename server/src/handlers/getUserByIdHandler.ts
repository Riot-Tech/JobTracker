import { Response, Request } from "express";



export const getUserByIdHandler = async (req: Request, res: Response) => { //seteamos de tipo any de forma provisoria
    try {
        const userId = req.params.id;
        const user = 'soy el handler';
        res.status(200).send(user);
    } catch (error) {
        res.status(400).json(error)
    }

}



