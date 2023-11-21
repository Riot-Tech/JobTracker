import { UploadedFile } from '../types';
import { Storage, Bucket } from '@google-cloud/storage';
import path from 'path';

// Configuraciones de Cloud Storage
const cloudStorage = new Storage({
    keyFilename: path.join(__dirname, "../../jobtracker-404413-962a6bab78a9.json"),
    projectId: "jobtracker-404413"
});

const uniqueCode = 'ljnro1je8kfp23yvwmaq5khzn-user-id-';



// Funcion para codificar los caracteres para que los lea Google
function encodeFileName(filename: string): string {
  const charactersToEncode = ['!', '#', '$', '&', '\'', '(', ')', '*', '+', ',', '/', ':', ';', '=', '?', '@', '[', ']', ' '];

  // Codifico cada caracter y lo devuelvo
  const encodedFilename = filename
    .split('')
    .map(char => charactersToEncode.includes(char) ? encodeURIComponent(char) : char)
    .join('');

  return encodedFilename;
};



async function findOrCreateBucket(userId: number) {
  try {
    // Busco en GCS un bucket que pertenezca al usuario
    const bucketName = `${uniqueCode}${userId}`;
    const [allBuckets] = await cloudStorage.getBuckets();
    const bucketExists = allBuckets.some((bucket: Bucket) => bucket.id === bucketName);

    
    // Si existe, devuelvo ese bucket
    if (bucketExists) {
      const bucket = cloudStorage.bucket(bucketName);
      console.log(`Bucket ${bucketName} found in GCS.`);
      return bucket;
    }
    
    // Si no existe, creo un bucket nuevo y lo devuelvo:
    const [newBucket] = await cloudStorage.createBucket(bucketName);
    if (newBucket) {
      console.log(`Bucket ${bucketName} created successfully.`);
      return newBucket;
    }
    throw Error("Error creating new bucket (at cloudUtils)");

  } catch (error) {
    console.error('Error at findOrCreateBucket', error);
    throw error;
  };
};



export async function uploadFile(file: UploadedFile, userId: number) {
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
};


export async function checkFileExistence(filename: string, userId: number): Promise<boolean> {
  try {
    const bucketName = `${uniqueCode}${userId}`;
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