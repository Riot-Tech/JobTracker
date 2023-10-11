import { Router, Request, Response } from "express";
import { postApplicationHandler, getApplicationsHandler } from "../handlers";


const applicationRouter: Router = Router();

applicationRouter.get("/", getApplicationsHandler);
applicationRouter.post("/", postApplicationHandler);

export default applicationRouter