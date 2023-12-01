# Job Tracker

## Descripción

**Job Tracker** es una aplicación diseñada para simplificar el seguimiento y registro de las aplicaciones laborales. Permite a los usuarios organizar de manera efectiva sus aplicaciones convencionales y espontáneas, así como gestionar archivos relacionados con el proceso de búsqueda de empleo. Además, ofrece un espacio para cargar enlaces personales relevantes en el perfil del usuario.

## Características Principales

- **Registro de Aplicaciones:** Mantén un historial ordenado de tus aplicaciones laborales, proporcionando detalles clave como el nombre de la empresa, la posición y la fecha de aplicación.

- **Gestión de Archivos:** La sección de archivos permite a los usuarios cargar y organizar documentos relevantes para sus aplicaciones, como currículums, cartas de presentación, entre otros.

- **Perfil Personalizado:** Agrega tus enlaces personales, como LinkedIn o portfolio, en tu perfil para tener acceso rápido a tu información profesional.

## Tecnologías Utilizadas

- **Frontend:** Desarrollado con React y TypeScript. Utiliza React Tool Kit y Tailwind CSS para una interfaz de usuario moderna y atractiva.

- **Backend:** Node.js con Prisma como ORM para la base de datos. Proporciona una API robusta para gestionar los datos de la aplicación.

## Instrucciones de Desarrollo


1. **Clonar el Repositorio:**
   
   ```bash
   git clone https://github.com/TuUsuario/job-tracker.git
   cd job-tracker

2. **Instalar Dependecia del Frontend:**
   
   ```bash
   cd client
   npm install

3. **Instalar Dependecia del Backend:**
   
   ```bash
   cd ../server
   npm install

4. **Configurar Variables de Entorno:**
   
   1. Copia el archivo `.env.example` y renómbralo a `.env`.
   2. Completa las variables de entorno según tus necesidades.


## Levantar el Servidor y Cliente en Modo Desarrollo

   1. **Iniciar el Servidor:**
  ```bash
      # En la carpeta /server
      npm run dev
  ```
  
   El servidor estará disponible en http://localhost:3001.

  2. **Iniciar el Servidor:**
  ```bash
      # En la carpeta /client
      npm run dev
```
   El servidor estará disponible en http://localhost:3000.


   ## Estructura del Proyecto

    /client: Contiene el código del frontend desarrollado con React.
  
    /server: Contiene el código del backend desarrollado con Node.js y Prisma.
   






   
  
