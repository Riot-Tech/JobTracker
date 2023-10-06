import { Router } from "express";
import { authenticationHandler } from "../handlers/authenthicationHandler";

const authRouter: Router = Router();

authRouter.post("/", authenticationHandler);

export default authRouter;
