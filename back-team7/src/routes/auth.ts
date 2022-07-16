import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import 'dotenv/config';
import { setAccessToken, setRefreshToken } from '../utils/jwt';
import { userService } from '../services';

const authRouter = Router();

const DOMAIN = process.env.DOMAIN || '';
const accessExp = Number(process.env.ACCESS_EXP) || 10;
const refreshExp = Number(process.env.REFRESH_EXP) || 24;

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      const accessToken = setAccessToken(req.user);
      const refreshToken = setRefreshToken();
      await userService.setUser(req.user._id, { refreshToken });
      res.cookie('accessToken', accessToken, { maxAge: accessExp * 60 * 1000, httpOnly: true });
      res
        .cookie('refreshToken', refreshToken, {
          maxAge: refreshExp * 60 * 60 * 1000,
          httpOnly: true,
        })
        .redirect(DOMAIN);
    } else {
      res.status(404).json();
    }
  }
);

authRouter.get('/kakao', passport.authenticate('kakao'));

authRouter.get(
  '/kakao/callback',
  passport.authenticate('kakao', { session: false }),
  async (req, res, next) => {
    if (req.user) {
      const accessToken = setAccessToken(req.user);
      const refreshToken = setRefreshToken();
      await userService.setUser(req.user._id, { refreshToken });
      res.cookie('accessToken', accessToken, { maxAge: accessExp * 60 * 1000, httpOnly: true });
      res
        .cookie('refreshToken', refreshToken, {
          maxAge: refreshExp * 60 * 60 * 1000,
          httpOnly: true,
        })
        .redirect(DOMAIN);
    } else {
      res.status(404).json();
    }
  }
);

export { authRouter };
