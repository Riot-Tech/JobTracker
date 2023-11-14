import express, { Application, Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from '../routes'; 
import multer from 'multer';
import { uploadFile } from '../utils/cloudUtils';

const server: Application = express();
const multerStorage = multer.memoryStorage();
const upload = multer({storage: multerStorage})


// Middlewares
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
server.use(bodyParser.json({ limit: '50mb' }))
server.use(cookieParser())
server.use(morgan('dev'))
server.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH')
  next()
})

server.post("/upload", upload.single('file'), async (req: Request, res: Response) => {
  try {
    console.log("ENTRE AL HANDLER");    
    console.log("fileeeee", req.file);
    const file = req.file;

    if (!file) {
      return res.status(400).send("No file received (at handler)");
    };

    uploadFile(file)
      .then(() => {
        return res.status(200).send(`${file.originalname} uploaded successfully`);
      });
      

      
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  };
});
server.use('/', routes);


// Error catching endware.
server.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
})

export default server;
