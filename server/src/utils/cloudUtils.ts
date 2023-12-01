import { UploadedFile } from '../types';
import { Storage, Bucket } from '@google-cloud/storage';
import * as fs from 'fs';
import * as path from 'path';
import moment from 'moment';

// Configuraciones de Cloud Storage
const cloudStorage = new Storage({
    keyFilename: path.join(__dirname, "../../jobtracker-404413-962a6bab78a9.json"),
    projectId: "jobtracker-404413"
});

// Este codigo funiona como plantilla para generar nombres de buckets en GCS
const uniqueCode = 'ljnro1je8kfp23yvwmaq5khzn-user-id-';



function encodeFileName(filename: string): string {
  // Funcion para codificar los caracteres para que los lea Google
  const charactersToEncode = ['!', '#', '$', '&', '\'', '(', ')', '*', '+', ',', '/', ':', ';', '=', '?', '@', '[', ']', ' '];

  // Codifico cada caracter y lo devuelvo
  const encodedFilename = filename
    .split('')
    .map(char => charactersToEncode.includes(char) ? encodeURIComponent(char) : char)
    .join('');

  return encodedFilename;
};

async function findBucket(userId: number) {
  try {
    // Busco en GCS un bucket que pertenezca al usuario
    const bucketName = `${uniqueCode}${userId}`;
    const [allBuckets] = await cloudStorage.getBuckets();
    const bucketExists = allBuckets.some((bucket: Bucket) => bucket.id === bucketName);
    
    console.log(bucketExists)
    return bucketExists;

  } catch(error) {
    console.error('Error at utils/cloudUtils/findBucket', error);
    throw error;
  };
}



async function findOrCreateBucket(userId: number) {
  try {
    // Busco en GCS un bucket que pertenezca al usuario
    const bucketName = `${uniqueCode}${userId}`;
    const bucketExists = await findBucket(userId);

    // Si existe, devuelvo ese bucket
    if (bucketExists) {
      const bucket = cloudStorage.bucket(bucketName);
      console.log(`Bucket ${bucketName} found in GCS.`);
      return bucket;
    };
    
    // Si no existe, creo un bucket nuevo y lo devuelvo:
    const [newBucket] = await cloudStorage.createBucket(bucketName);
    if (newBucket) {
      console.log(`Bucket ${bucketName} created successfully.`);
      return newBucket;
    };
    throw Error("Error creating new bucket (at cloudUtils)");

  } catch (error) {
    console.error('Error at utils/cloudUtils/findOrCreateBucket', error);
    throw error;
  };
};


function getDownloadsPath(): string {
  // Esta funcion determina donde esta la carpeta de desccargas, segun el sistema operativo del usuario
  switch(process.platform) {
    case 'win32':
      return path.join(process.env.USERPROFILE || '', 'Downloads');
    case 'darwin':
      return path.join(process.env.HOME || '', 'Downloads');
    case 'linux':
      return path.join(process.env.HOME || '', 'Downloads');
    default:
      throw new Error (`Unsupported operating system: ${process.platform}`);
  };
};



export async function uploadFile(file: UploadedFile, userId: number) {
  try {
    // Busco el nombre de bucket correcto segun el id de usuario
    const bucket = await findOrCreateBucket(userId);
    const bucketName = `${uniqueCode}${userId}`;

    return new Promise<string>((resolve, reject) => {
      if (file) {
        // Intento subir el archivo a la nube de GCS, a nuestro bucket
        const encodedFileName = encodeFileName(file.originalname);

        const newFile = bucket.file(file.originalname);
        const stream = newFile.createWriteStream();

        // Si la subida falla, devuelvo el error
        stream.on("error",(err) => {
          console.error(err);
          reject(err);
        });

        // Si se sube con exito, armo la nueva URL y la devuelvo
        stream.on("finish", () => {
          const fileUrl = `https://storage.cloud.google.com/${bucketName}/${encodedFileName}`;
          resolve(fileUrl);
        });

        stream.end(file.buffer);
      } else reject("No file received (at cloudUtils)");
    });

  } catch (error) {
    console.error("Error at utils/cloudUtils/uploadFile", error);
    throw error;
  }

};


export async function checkFileExistence(filename: string, userId: number): Promise<boolean> {
  try {
    // Me fijo en GCS si hay un Bucket ya creado para ese usuario
    const bucketName = `${uniqueCode}${userId}`;
    const bucketExists = await findBucket(userId);

    if (!bucketExists) {
      console.log('User has no active bucket in cloud.');
      return false;
    }

    const [files] = await cloudStorage.bucket(bucketName).getFiles();
    const fileExists = files.some(file => file.name === filename);

    if (fileExists) {
      console.log(`File ${filename} already exists in bucket`);
      return true;
    }
    console.log(`File ${filename} does not exist in bucket`);
    return false;

  } catch (error) {
    console.error("Error at checkFileExistence", error);
    throw error;
  };
};


export async function downloadFile(filename: string, userId: number): Promise<string> {
  try {
    // Encuentro el bucket correcto y el archivo a descargar
    const bucketName = `${uniqueCode}${userId}`;
    const bucket = cloudStorage.bucket(bucketName);
    const file = bucket.file(filename);

    // Ahora busco cual es la carpeta de descargas por defecto del sistema operativo
    const downloadsFolder = getDownloadsPath();

    // Creo la ruta en la que quedaria descargado el archivo
    const destinationPath = path.join(downloadsFolder, filename);

    const stream = fs.createWriteStream(destinationPath);

    file.createReadStream().pipe(stream);

    return new Promise<string>((resolve, reject) => {
      stream.on('finish', () => {
        console.log(`File downloaded at ${destinationPath}`);
        resolve(`File downloaded at ${destinationPath}`);
      });

      stream.on('error', (error) => {
        console.log(`Error downloading ${filename}: `, error);
        reject(error);
      });
    });

  } catch (error) {
    console.error("Error at utils/cloudUtils/downloadFile", error);
    throw error;
  }

};


export async function viewFile(filename: string, userId: number) {
  try {
    // Me fijo en GCS si hay un Bucket ya creado para ese usuario
    const bucketName = `${uniqueCode}${userId}`;
    const bucketExists = await findBucket(userId);
    if (!bucketExists) {
      throw new Error ('User has no active bucket in cloud.');
    }

    // Encuentro el bucket correcto y el archivo a visualizar
    const bucket = cloudStorage.bucket(bucketName);
    const file = bucket.file(filename);

    // Genero una URL firmada (signed URL) para dar permiso al usuario para ver el archivo  en GCS
    const signDuration = moment.duration(2, 'hours').asSeconds();
    const signedUrl = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + signDuration * 1000,
    });

    return signedUrl[0];
    
  } catch (error) {
    console.log("Error at cloudUtils/viewFile");
    console.error(error);
    throw error;
  };
};



const storage = new Storage();


export const deleteFileFromStorage = async (userId: number, filename: string) => {
  try {
    
    const bucketName = `${uniqueCode}${userId}`;
    const bucket = await findOrCreateBucket(userId);

    if(bucket){
      // Elimina el archivo del almacenamiento de Google Cloud Storage
      await bucket.file(filename).delete();
    
      return ('File deleted in storage')
    }

  } catch (error) {
    console.error('Error deleting file from storage', error);
    throw new Error('Error deleting file from storage');
  }
};