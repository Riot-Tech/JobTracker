import { Router } from "express";
import { postSpontaneusHandler } from "../handlers";

const spontaneusRouter = Router();

spontaneusRouter.post('/', postSpontaneusHandler);


export default spontaneusRouter;

