import { UploadedFile } from '../types';
import { Storage } from '@google-cloud/storage';
import path from 'path';

// Configuraciones de Cloud Storage
const cloudStorage = new Storage({
    keyFilename: path.join(__dirname, "../../jobtracker-404413-962a6bab78a9.json"),
    projectId: "jobtracker-404413"
  });

const bucketName = "jt-cv-files";
const cvFilesBucket = cloudStorage.bucket(bucketName);



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



export function uploadFile(file: UploadedFile) {
  // Aca podria implementarse una division de la ruta de GCS, usuario por usuario

  return new Promise<string>((resolve, reject) => {
    if (file) {
      // Intento subir el archivo a la nube de GCS, a nuestro bucket
      const encodedFileName = encodeFileName(file.originalname);
      const newFile = cvFilesBucket.file(file.originalname);
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