import { Router } from "express";
import { getLinksHandler, postLinkHandler, disableLinkHandler, updateLinkHandler } from "../handlers";


const linkRouter: Router = Router();

linkRouter.get("/", getLinksHandler);
linkRouter.post("/", postLinkHandler);
linkRouter.patch("/", updateLinkHandler);
linkRouter.patch("/:id", disableLinkHandler);


export default linkRouter