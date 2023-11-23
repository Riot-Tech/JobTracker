import { input, inputLogin, inputSpontaneous, fileErrors } from "../models/interfaces"

export const hasErrors = (errors: input | inputLogin)=>{
   // return Object.values(errors).some((value)=> typeof(value)==='string')
   return Object.values(errors).some((value)=> value.length>0)
}

export const hasErrorsSpontaneous = (errors: inputSpontaneous) =>{
   return Object.values(errors).some((value)=> value.length>0)
}

export const hasErrorsFile = (errors: fileErrors) =>{
   return Object.values(errors).some((value)=> value.length>0)
}

export const formattedDate = (date: string) => {
// Crear un objeto Date con la fecha original
const fecha = new Date(date);

// Extraer el año, mes y día
const year = fecha.getFullYear();
const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Sumar 1 al mes, ya que los meses van de 0 a 11
const day = String(fecha.getDate()).padStart(2, '0');

// Formatear la nueva fecha
const formatted = `${year}-${month}-${day}`;

return formatted

}