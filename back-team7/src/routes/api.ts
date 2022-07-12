import { Router } from 'express';
import { userRouter } from './api/';
import { loginCheckAndRefreshToken, logout } from '../middlewares';
import { feedRouter } from './api/';
import { reviewRouter } from './api/';

const apiRouter = Router();

// apiRouter.use('/users', loginCheckAndRefreshToken, userRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/loginCheck', loginCheckAndRefreshToken);
apiRouter.use('/logout', logout);
apiRouter.use('/feeds', /*feedRequired,*/ feedRouter);
apiRouter.use('/reviews', /*reviewRequired,*/ reviewRouter);

export { apiRouter };
