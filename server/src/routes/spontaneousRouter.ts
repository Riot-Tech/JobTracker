import { Router } from "express";
import { postSpontaneousHandler } from "../handlers";

const spontaneusRouter = Router();

spontaneusRouter.post('/', postSpontaneousHandler);


export default spontaneusRouter;

