import { Router } from "express";
import { 
    // getLinksHandler,
    postFileHandler,
    // disableLinkHandler,
    // updateLinkHandler
} from "../handlers";
import multer from 'multer';

const fileRouter: Router = Router();
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

// linkRouter.get("/", getLinksHandler);
fileRouter.post("/", upload.single('file'), postFileHandler);
// linkRouter.patch("/", updateLinkHandler);
// linkRouter.patch("/:id", disableLinkHandler);


export default fileRouter;