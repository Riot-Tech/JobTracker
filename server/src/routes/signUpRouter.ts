import { Router, Request, Response } from "express";
import { signUpHandler } from "../handlers";


const signUpRouter: Router = Router();

signUpRouter.post("/", signUpHandler);

export default signUpRouter