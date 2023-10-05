import { Router } from 'express';
import authRouter from './authenticationRouter'
import signUpRouter from './signUpRouter';

const mainRouter = Router();

mainRouter.use('/login', authRouter)
mainRouter.use('/signUp', signUpRouter)

export default mainRouter;