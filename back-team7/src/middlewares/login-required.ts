import { Request, Response, NextFunction } from 'express';

export const loginRequired = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    const error = new Error('로그인해주세요.');
    error.name = 'NotAcceptable';
    res.redirect('/');
    throw error;
  }

  next();
};
