import { Router } from "express";
import { postSpontaneousHandler, updateSpontaneousHandler, disableSpontaneousHandler, getSpontaneousHandler, getSpontaneousByIdHandler } from "../handlers";

const spontaneusRouter = Router();

spontaneusRouter.get("/:id", getSpontaneousHandler);
spontaneusRouter.get("/:id", getSpontaneousByIdHandler);
spontaneusRouter.post('/', postSpontaneousHandler);
spontaneusRouter.patch('/', updateSpontaneousHandler);
spontaneusRouter.patch('/:id', disableSpontaneousHandler);


export default spontaneusRouter;