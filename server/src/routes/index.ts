import { Router } from 'express';
import authRouter from './authenticationRouter'
import signUpRouter from './signUpRouter';
import userRouter from './userRouter';
import applicationRouter from './applicationRouter';
import spontaneousRouter from './spontaneousRouter';
import fileRouter from './fileRouter';

const mainRouter = Router();

mainRouter.use('/login', authRouter);
mainRouter.use('/signUp', signUpRouter);
mainRouter.use('/user', userRouter);
mainRouter.use('/application', applicationRouter);
mainRouter.use('/spontaneous', spontaneousRouter);
mainRouter.use('/', authRouter);
mainRouter.use('/file', fileRouter)

export default mainRouter;