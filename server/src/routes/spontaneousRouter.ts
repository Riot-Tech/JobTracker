import { Router } from "express";
import { postSpontaneousHandler, updateSpontaneousHandler, disableSpontaneousHandler } from "../handlers";

const spontaneusRouter = Router();

// spontaneusRouter.get("/", getSpontaneousHandler);
spontaneusRouter.post('/', postSpontaneousHandler);
spontaneusRouter.patch('/', updateSpontaneousHandler);
spontaneusRouter.patch('/:id', disableSpontaneousHandler);


export default spontaneusRouter;