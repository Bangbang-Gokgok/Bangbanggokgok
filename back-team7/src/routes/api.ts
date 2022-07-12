import { Router } from 'express';
import { userRouter } from './api/';
import { loginCheckAndRefreshToken, logout } from '../middlewares';

const apiRouter = Router();

// apiRouter.use('/users', loginCheckAndRefreshToken, userRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/loginCheck', loginCheckAndRefreshToken);
apiRouter.use('/logout', logout);

export { apiRouter };
