import { Router } from 'express';
import { userRouter } from './api/';
import { loginCheckAndRefreshToken } from '../middlewares';

const apiRouter = Router();

// apiRouter.use('/users', loginCheckAndRefreshToken, userRouter);
apiRouter.use('/users', userRouter);

export { apiRouter };
