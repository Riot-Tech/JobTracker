import { Router, Request, Response } from "express";
import { postApplicationHandler, getApplicationHandler } from "../handlers";


const applicationRouter: Router = Router();

applicationRouter.get("/", getApplicationHandler);
applicationRouter.post("/", postApplicationHandler);

export default applicationRouter