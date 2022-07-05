const passport = require('passport');

const { jwt } = require('./strategies/jwt');
const { google } = require('./strategies/google');

export function usePassport() {
  passport.use(jwt);
  passport.use(google);
}
