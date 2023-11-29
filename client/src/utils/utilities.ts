import axios from "axios"
import { input, inputLogin, inputSpontaneous, fileErrors, Links, UserInfo } from "../models/interfaces"
import { URL } from "./url"
import { getApplications } from "../redux/slices/applications.slice"
import { addSpontaneous } from "../redux/slices/spontaneous.slice"
import { addFile } from "../redux/slices/files.slice"

export const hasErrors = (errors: input | inputLogin | Links)=>{
   // return Object.values(errors).some((value)=> typeof(value)==='string')
   return Object.values(errors).some((value)=> value.length>0)
}

export const isInputEmpty = (input: inputSpontaneous) =>{
   return !Object.values(input).some((value)=> value.length)
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

export const setGlobalStates = async (dispatch: any, activeUser: UserInfo) => {
   try {
     let responseApps = (await axios.get(`${URL}/application//?id=${activeUser.id}`)).data;
     let responseSponts = (await axios.get(`${URL}/spontaneous/?id=${activeUser.id}`)).data;
     let responseFiles = (await axios.get(`${URL}/file/?id=${activeUser.id}`)).data;


     dispatch(getApplications(responseApps))
     dispatch(addSpontaneous(responseSponts))
     dispatch(addFile(responseFiles))
   } catch (error) {
     console.log(error);
   }
 };