import { Router, Request, Response } from "express";
import { postApplicationHandler, getApplicationsHandler, updateApplicationHandler } from "../handlers";


const applicationRouter: Router = Router();

applicationRouter.get("/", getApplicationsHandler);
applicationRouter.post("/", postApplicationHandler);
applicationRouter.patch("/", updateApplicationHandler)

export default applicationRouter