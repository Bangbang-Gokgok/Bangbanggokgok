import 'dotenv/config';
const { Strategy, StrategyOptions, Profile, VerifyCallback } = require('passport-google-oauth20');
import { User } from '../../models';

const config: typeof StrategyOptions = {
  clientID: process.env.CLIENT_ID as string, // clientId 설정하기
  clientSecret: process.env.CLIENT_SECRET as string, // clientSecret 설정하기
  callbackURL: '/auth/google/callback',
};

async function findOrCreateUser(name: string, email: string) {
  const user = await User.findOne({
    email,
  });

  if (user) {
    return user;
  }

  const created = await User.create({
    name,
    email,
    password: 'GOOGLE_OAUTH',
  });

  return created;
}

export const google = new Strategy(
  config,
  async (accessToken: string, refreshToken: string, profile: typeof Profile, done: typeof VerifyCallback) => {
    const { email, name } = profile._json;
    try {
      const user = await findOrCreateUser(name!, email!);
      done(null, {
        _id: user._id,
        email: user.email,
        name: user.name,
      });
    } catch (e: any) {
      done(e, undefined);
    }
  },
);
