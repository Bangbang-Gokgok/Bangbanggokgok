import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import { userService } from '../services';
import { setAccessToken } from '../utils/jwt';

const DOMAIN = process.env.DOMAIN || '';
const accessExp = Number(process.env.ACCESS_EXP) || 10;

export const loginCheckAndRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.cookies.refreshToken) {
    if (!req.cookies.accessToken) {
      const { _id, authority, email, name } = await userService.getUserDataByRefreshToken(
        req.cookies.refreshToken
      );
      const accessToken = setAccessToken({ _id, authority, email, name });
      res.cookie('accessToken', accessToken, { maxAge: accessExp * 60 * 1000, httpOnly: true });
    }
  } else {
    const error = new Error('로그인해주세요.');
    error.name = 'NotAcceptable';
    res.redirect(DOMAIN);
    throw error;
  }
  next();
};

export const adminCheck = (req: Request, res: Response, next: NextFunction) => {
  loginCheckAndRefreshToken(req, res, next);
  if (req.user!.authority !== 'admin') {
    const error = new Error('관리자가 아닙니다.');
    error.name = 'NotAcceptable';
    res.redirect(DOMAIN);
    throw error;
  }
};
