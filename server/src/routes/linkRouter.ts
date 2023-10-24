import { Router } from "express";
import { postLinkHandler } from "../handlers";


const linkRouter: Router = Router();

// filesRouter.get("/", getFilesHandler);
linkRouter.post("/", postLinkHandler);
// linkRouter.patch("/", updateApplicationHandler);
// linkRouter.patch("/:id", disableLinkHandler);


export default linkRouter