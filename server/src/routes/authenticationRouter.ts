import { Router } from "express";
import { authenticationHandler } from "../handlers";

const authRouter: Router = Router();

authRouter.post("/", authenticationHandler);

export default authRouter;
