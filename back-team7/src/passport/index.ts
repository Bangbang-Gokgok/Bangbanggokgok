import passport from 'passport';

import { jwt } from './strategies/jwt';
import { google } from './strategies/google';

export function usePassport() {
  passport.use(jwt);
  passport.use(google);
}
