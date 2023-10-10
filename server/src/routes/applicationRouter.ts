import { Router, Request, Response } from "express";
import { postApplicationHandler } from "../handlers";


const applicationRouter: Router = Router();

applicationRouter.post("/", postApplicationHandler);

export default applicationRouter