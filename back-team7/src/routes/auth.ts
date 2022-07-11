import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import 'dotenv/config';
import { setAccessToken, setRefreshToken } from '../utils/jwt';
import { userService } from '../services';

const authRouter = Router();

const DOMAIN = process.env.DOMAIN || '';

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      const accessToken = setAccessToken(req.user);
      const refreshToken = setRefreshToken();
      await userService.setUser(req.user._id, { refreshToken });
      res.cookie('accessToken', accessToken);
      res.cookie('refreshToken', refreshToken).redirect(DOMAIN);
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
      const accessToken = setAccessToken(req.user);
      const refreshToken = setRefreshToken();
      res.cookie('accessToken', accessToken);
      res.cookie('refreshToken', refreshToken).redirect(DOMAIN);
    } else {
      res.status(404).json();
    }
  }
);

authRouter.get('/logout', async (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    await userService.setUser(req.user._id, { refreshToken: '' });
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken').redirect(DOMAIN);
  } else {
    res.status(404).json();
  }
});

export { authRouter };
