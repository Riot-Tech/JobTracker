//require('dotenv').config()
import * as dotenv from 'dotenv';
import { Application } from 'express';

dotenv.config();

const app: Application = require('./src/app')
//Importa Application desde 'express' y declara el tipo de app como Application para que TypeScript sepa que app es una instancia de Express.

const { PORT } = process.env as Record<string, string>;
// Usa "as Record<string, string>" para indicar que "process.env" contiene pares clave-valor de tipo string
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
