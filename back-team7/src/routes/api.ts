import { Router } from 'express';
import { userRouter, feedRouter, reviewRouter } from './api/';
import { loginCheckAndRefreshToken, logout } from '../middlewares';

const apiRouter = Router();

// apiRouter.use('/users', loginCheckAndRefreshToken, userRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/loginCheck', loginCheckAndRefreshToken, (req, res, next) => {
  res.status(200).json();
});
apiRouter.use('/logout', logout);
apiRouter.use('/feeds', /*feedRequired,*/ feedRouter);
apiRouter.use('/reviews', /*reviewRequired,*/ reviewRouter);

export { apiRouter };
