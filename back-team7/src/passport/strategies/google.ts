import 'dotenv/config';
const { Strategy, StrategyOptions, Profile, VerifyCallback } = require('passport-google-oauth20');
import { User } from '../../models';

const config: typeof StrategyOptions = {
  clientID: process.env.CLIENT_ID!, // clientId 설정하기
  clientSecret: process.env.CLIENT_SECRET!, // clientSecret 설정하기
  callbackURL: '/auth/google/callback',
};

async function findOrCreateUser(email: string, name: string) {
  const user = await User.findOne({
    email,
  });

  if (user) {
    return user;
  }
  const created = await User.create({
    email,
    name,
  });

  return created;
}

export const google = new Strategy(
  config,
  async (
    accessToken: string,
    refreshToken: string,
    profile: typeof Profile,
    done: typeof VerifyCallback
  ) => {
    const { email, name } = profile._json;
    try {
      const {
        _id,
        authority,
        description,
        profileImage,
        address,
        contactNumber,
        location,
        friends,
      } = await findOrCreateUser(email!, name!);
      done(null, {
        _id,
        authority,
        email,
        name,
        description,
        profileImage,
        address,
        contactNumber,
        location,
        friends,
      });
    } catch (e: any) {
      done(e, undefined);
    }
  }
);
