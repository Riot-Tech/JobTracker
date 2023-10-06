import { Response, Request } from "express";



export const postUserHandler = async (req: Request, res: Response) => { //seteamos de tipo any de forma provisoria
    try {
        const newUser = req.body;
        const user = 'soy el postUserHandler';
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({error})
    }

}
