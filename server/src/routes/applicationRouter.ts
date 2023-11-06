import { Router } from "express";
import { postApplicationHandler, getApplicationsHandler, updateApplicationHandler, disableApplicationHandler, getApplicationByIdHandler } from "../handlers";


const applicationRouter: Router = Router();

applicationRouter.get("/", getApplicationsHandler);
applicationRouter.get("/:id", getApplicationByIdHandler);
applicationRouter.post("/", postApplicationHandler);
applicationRouter.patch("/", updateApplicationHandler);
applicationRouter.patch("/:id", disableApplicationHandler);

export default applicationRouter