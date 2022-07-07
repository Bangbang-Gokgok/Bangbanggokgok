import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { setUserToken } from '../utils/jwt';
import 'dotenv/config';

const authRouter = Router();

const DOMAIN = process.env.DOMAIN || '';

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      const token = setUserToken(req.user);
      res.cookie('token', token).redirect(DOMAIN);
    } else {
      res.status(404).json();
    }
  }
);

authRouter.get('/kakao', passport.authenticate('kakao'));

authRouter.get(
  '/kakao/callback',
  passport.authenticate('kakao', { session: false }),
  (req, res, next) => {
    if (req.user) {
      const token = setUserToken(req.user);
      res.cookie('token', token).redirect(DOMAIN);
    } else {
      res.status(404).json();
    }
  }
);

authRouter.get('/logout', (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie('token').redirect(DOMAIN);
});

export { authRouter };
