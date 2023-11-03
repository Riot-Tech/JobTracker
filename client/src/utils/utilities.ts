import { input, inputSpontaneous } from "../models/interfaces"

export const hasErrors = (errors:input | inputSpontaneous)=>{
   return Object.values(errors).some((value)=> typeof(value)==='string')
}

export const hasErrorsSpontaneous = (errors: inputSpontaneous) =>{
   return Object.values(errors).some((value)=> value.length>0)
}