import { Router } from 'express';
import { userRouter } from './api/';
import { loginRequired } from '../middlewares';
import { feedRouter } from './api/';
import { reviewRouter } from './api/';

const apiRouter = Router();

// apiRouter.use('/users', loginRequired, userRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/feeds', /*feedRequired,*/ feedRouter);
apiRouter.use('/reviews', /*reviewRequired,*/ reviewRouter);

export { apiRouter };
