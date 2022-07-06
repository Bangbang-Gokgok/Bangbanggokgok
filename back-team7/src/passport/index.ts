import passport from 'passport';

import { jwt } from './strategies/jwt';
import { google } from './strategies/google';
import { kakao } from './strategies/kakao';

export function usePassport() {
  passport.use(jwt);
  passport.use(google);
  passport.use(kakao);
}
