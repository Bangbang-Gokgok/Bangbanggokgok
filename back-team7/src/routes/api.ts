import { Router } from 'express';
import { userRouter } from './api/';
import { loginRequired } from '../middlewares';

const apiRouter = Router();

// apiRouter.use('/users', loginRequired, userRouter);
apiRouter.use('/users', userRouter);

export { apiRouter };
