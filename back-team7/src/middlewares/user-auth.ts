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
  try {
    console.log(req.headers);
    if (req.cookies.refreshToken) {
      if (!req.cookies.accessToken) {
        const { _id, authority, email, name } = await userService.getUserDataByRefreshToken(
          req.cookies.refreshToken
        );
        const accessToken = setAccessToken({ _id, authority, email, name });
        res.cookie('accessToken', accessToken, { maxAge: accessExp * 60 * 1000, httpOnly: true });
      }
    } else {
      const error = new Error('refreshToken이 없습니다.');
      error.name = 'Unauthorized';
      next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const adminCheck = (req: Request, res: Response, next: NextFunction) => {
  loginCheckAndRefreshToken(req, res, next);
  if (req.user!.authority !== 'admin') {
    const error = new Error('관리자만 접근 가능합니다.');
    error.name = 'Forbidden';
    res.redirect(DOMAIN);
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies.refreshToken) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken').redirect(DOMAIN);
  } else {
    res.status(404).json();
  }
};
