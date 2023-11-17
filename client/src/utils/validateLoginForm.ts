import { inputLogin } from "../models/interfaces";
import { z } from 'zod'

export const validateLoginForm = (input: inputLogin) =>{
    const { email, password } = input

    const schema = z.object({
        email: z.string().email("Invalid mail").min(1, "Mail required"),
        password: z.string().min(3, "At least three characters")
      });

      try {
        schema.parse({
          email,
          password,
        });
        return {email: "", password: ""} ; // No hay errores
      } catch (error: unknown) {
        if (typeof error === "object") {
          const errors: inputLogin = {email: "", password: ""}
    
          const zodError = error as z.ZodError;

          zodError.issues.forEach((issue) => {
            if (issue.path) {
              errors[issue.path[0]] = issue.message;
            }
          });
    
          return errors;
        }
    
        return {email: "", password: ""} 
      }
}