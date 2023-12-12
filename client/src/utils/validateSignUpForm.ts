import { input } from "../models/interfaces";
import { z } from 'zod'

export const validateSignUpForm = (input: input) =>{
    const { email, password, name } = input

    const schema = z.object({
        name: z.string().min(3,"At least three letters").max(50, '50 characters max'),
        email: z.string().email("Invalid email").min(1, "Email required"),
        password: z.string().min(3, "At least three characters"),
      });
      try {
        schema.parse({
          name,
          email,
          password
        });
        return {name:"", email: "", password: ""}; // No hay errores
      } catch (error: unknown) {
        if (typeof error === "object") {
          const errors: input = {name:"", email: "", password: ""}
    
          const zodError = error as z.ZodError;
          zodError.issues.forEach((issue) => {
            if (issue.path) {
              errors[issue.path.join(".")] = issue.message;
            }
          });
    
          return errors;
        }
    
        return {name:"", email: "", password: ""} 
      }
}