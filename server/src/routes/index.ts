import { Router } from 'express';
import authRouter from './authenticationRouter'
import userRouter from './userRouter';

const mainRouter = Router();

mainRouter.use('/', authRouter)
mainRouter.use('/user', userRouter)

export default mainRouter;