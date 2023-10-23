import { Router } from "express";
import { postApplicationHandler, getApplicationsHandler, updateApplicationHandler, disableApplicationHandler } from "../handlers";


const applicationRouter: Router = Router();

applicationRouter.get("/", getApplicationsHandler);
applicationRouter.post("/", postApplicationHandler);
applicationRouter.patch("/", updateApplicationHandler);
applicationRouter.patch("/:id", disableApplicationHandler);

export default applicationRouter