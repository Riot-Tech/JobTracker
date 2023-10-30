import { Router } from "express";
import { getLinksHandler, postLinksHandler, disableLinkHandler, updateLinkHandler } from "../handlers";


const linkRouter: Router = Router();

linkRouter.get("/", getLinksHandler);
linkRouter.post("/", postLinksHandler);
linkRouter.patch("/", updateLinkHandler);
linkRouter.patch("/:id", disableLinkHandler);


export default linkRouter