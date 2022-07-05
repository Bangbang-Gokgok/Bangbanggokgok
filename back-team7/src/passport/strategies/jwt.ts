import { Request } from 'express';
const { Strategy } = require('passport-jwt');
import { secret } from '../../utils/jwt';

const cookieExtractor = (req: Request) => {
  const { token } = req.cookies;
  return token;
};

const opts = {
  secretOrKey: secret,
  jwtFromRequest: cookieExtractor,
};

export const jwt = new Strategy(opts, (user: any, done: any) => {
  done(null, user);
});
