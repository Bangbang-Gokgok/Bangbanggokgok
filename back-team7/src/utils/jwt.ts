const jwt = require('jsonwebtoken');
const { JwtPayload } = require('jsonwebtoken');
import 'dotenv/config';

export const secret = process.env.JWT_SECRET || '';

export function setUserToken(user: Express.User): string {
  const token = jwt.sign(user, secret);
  return token;
}

export function getUserDataFromToken(token: string): typeof JwtPayload | Error {
  const user = jwt.verify(token, secret);
  if (typeof user !== 'string') {
    return user;
  } else {
    const error = new Error('토큰이 정상적으로 변환되지 않았습니다.');
    error.name = 'InternalServerError';
    throw error;
  }
}
