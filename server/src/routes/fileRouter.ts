import { Router } from "express";
import { 
    getFilesHandler,
    postFileHandler,
    disableFileHandler,
    updateFileHandler,
    downloadFileHandler,
    viewFileHandler,
} from "../handlers";
import multer from 'multer';

// Configuramos multer para la carga de archivos a la nube
const fileRouter: Router = Router();
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });


fileRouter.get("/", getFilesHandler);
fileRouter.post("/", upload.single('file'), postFileHandler);
fileRouter.patch("/", updateFileHandler);
fileRouter.delete("/:id", disableFileHandler);
fileRouter.get('/download/:id', downloadFileHandler);
fileRouter.get('/view/:id', viewFileHandler);


export default fileRouter;