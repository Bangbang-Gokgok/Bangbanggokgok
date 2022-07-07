import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';

const DOMAIN = process.env.DOMAIN || '';

export const loginRequired = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    const error = new Error('로그인해주세요.');
    error.name = 'NotAcceptable';
    res.redirect(DOMAIN);
    throw error;
  }

  next();
};

export const isAdmin = (req: any, res: Response, next: NextFunction) => {
  loginRequired(req, res, next);
  if (req.user!.authority !== 'admin') {
    const error = new Error('관리자가 아닙니다.');
    error.name = 'NotAcceptable';
    res.redirect(DOMAIN);
    throw error;
  }
};
