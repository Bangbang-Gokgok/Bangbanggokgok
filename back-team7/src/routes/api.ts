import { Router } from 'express';
import { userRouter, feedRouter, adminRouter, reviewRouter } from './api/';
// import { loginCheckAndRefreshToken, logout } from '../middlewares';
import { loginCheckAndRefreshToken, logout, adminCheck } from '../middlewares';

const apiRouter = Router();

apiRouter.use('/users', userRouter);
// apiRouter.use('/admins', adminRouter);
apiRouter.use('/admins', adminCheck, adminRouter);
apiRouter.use('/loginCheck', loginCheckAndRefreshToken, (req, res, next) => {
  res.status(200).json();
});
apiRouter.use('/logout', logout);
apiRouter.use('/feeds', feedRouter);
apiRouter.use('/reviews', reviewRouter);

export { apiRouter };
