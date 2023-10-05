import { Router } from 'express';
import authRouter from './authenticationRouter'

const mainRouter = Router();

mainRouter.use('/', authRouter)

export default mainRouter;