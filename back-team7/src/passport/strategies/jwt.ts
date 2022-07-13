import { Request } from 'express';
const { Strategy } = require('passport-jwt');
import { secret } from '../../utils/jwt';

const cookieExtractor = (req: Request) => {
  let accessToken = null;
  if (req.cookies.accessToken) {
    accessToken = req.cookies.accessToken;
  }
  return accessToken;
};

const opts = {
  secretOrKey: secret,
  jwtFromRequest: cookieExtractor,
};

export const jwt = new Strategy(opts, (user: any, done: any) => {
  done(null, user);
});
