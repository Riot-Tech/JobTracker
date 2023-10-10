import { Router } from 'express';
import authRouter from './authenticationRouter'
import signUpRouter from './signUpRouter';
import userRouter from './userRouter';
import applicationRouter from './applicationRouter';

const mainRouter = Router();

mainRouter.use('/login', authRouter)
mainRouter.use('/signUp', signUpRouter)
mainRouter.use('/user', userRouter)
mainRouter.use('/application', applicationRouter)
mainRouter.use('/', authRouter)

export default mainRouter;