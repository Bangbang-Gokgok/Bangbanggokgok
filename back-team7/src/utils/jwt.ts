const jwt = require('jsonwebtoken');
const { JwtPayload } = require('jsonwebtoken');
import 'dotenv/config';

export const secret = process.env.JWT_SECRET || '';

export function setUserToken(user: Express.User): string {
  const token = jwt.sign(user, secret, { expiresIn: '10m' });
  return token;
}
