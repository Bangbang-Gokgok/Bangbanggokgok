const jwt = require('jsonwebtoken');
const { JwtPayload } = require('jsonwebtoken');
import 'dotenv/config';

export const secret = process.env.JWT_SECRET || '';

export function setAccessToken(user: Express.User): string {
  const accessToken = jwt.sign(user, secret, { expiresIn: '10m' });
  return accessToken;
}

export function setRefreshToken(): string {
  const refreshToken = jwt.sign({}, secret, { expiresIn: '1d' });
  return refreshToken;
}

export function getDataFromToken(token: string): any {
  try {
    const data = jwt.verify(token, secret);
    return data;
  } catch (e) {
    return null;
  }
}
