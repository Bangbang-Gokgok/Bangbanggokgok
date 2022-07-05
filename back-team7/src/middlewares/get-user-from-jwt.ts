import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

function getUserFromJWT(req: Request, res: Response, next: NextFunction) {
  if (req.cookies.token) {
    return passport.authenticate('jwt', { session: false })(req, res, next);
  } else {
    next();
  }
}

export { getUserFromJWT };
