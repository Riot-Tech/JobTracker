import { input } from "../models/interfaces";
import { z } from 'zod'

export const validateSignUpForm = (input: input) =>{
    const { email, password, name, linkedIn, gitHub, portfolio } = input

    const schema = z.object({
        name: z.string().min(3,"At least three letters").max(50, '50 characters max'),
        email: z.string().email("Invalid email").min(1, "Email required"),
        password: z.string().min(3, "At least three characters"),
        linkedIn: z.string().max(100).refine((value) => {
          // Asegurarse de que el enlace comienza con 'http'
          return value.startsWith('http');
        }, {
          message: 'Invalid Link',
        }),
        gitHub: z.string().max(100).refine((value) => {
          // Asegurarse de que el enlace comienza con 'http'
          return value.startsWith('http');
        }, {
          message: 'Invalid Link',
        }),
        portfolio: z.string().max(100).refine((value) => {
          // Asegurarse de que el enlace comienza con 'http'
          return value.startsWith('http');
        }, {
          message: 'Invalid Link',
        }),
      });
      try {
        schema.parse({
          name,
          email,
          password,
          linkedIn,
          gitHub,
          portfolio
        });
        return {name:"", email: "", password: "", linkedIn:"", gitHub:"", portfolio:""}; // No hay errores
      } catch (error: unknown) {
        if (typeof error === "object") {
          const errors: input = {name:"", email: "", password: "", linkedIn:"", gitHub:"", portfolio:""}
    
          const zodError = error as z.ZodError;
          zodError.issues.forEach((issue) => {
            if (issue.path) {
              errors[issue.path.join(".")] = issue.message;
            }
          });
    
          return errors;
        }
    
        return {name:"", email: "", password: "", linkedIn:"", gitHub:"", portfolio:""} 
      }
}