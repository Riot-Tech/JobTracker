import { input } from "../models/interfaces"

export const hasErrors = (errors:input)=>{
   return Object.values(errors).some((value)=> typeof(value)==='string')
}