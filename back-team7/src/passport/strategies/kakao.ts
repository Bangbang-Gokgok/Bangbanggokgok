const KakaoStrategy = require('passport-kakao').Strategy;
import { model } from 'mongoose';
import { User } from '../../models';

const config = {
  clientID: process.env.KAKAO_ID, // 카카오 로그인에서 발급받은 REST API 키
  callbackURL: '/auth/kakao/callback', // 카카오 로그인 Redirect URI 경로
};

async function findOrCreateUser(email: string, name: string) {
  const user = await User.findOne({ email });

  if (user) {
    return user;
  }

  const created = await User.create({
    name,
    email,
  });

  return created;
}

export const kakao = new KakaoStrategy(
  config,
  async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    const email = profile._json.kakao_account.email;
    const name = profile._json.properties.nickname;
    try {
      const { _id, authority, friends } = await findOrCreateUser(email!, name!);
      done(null, {
        _id,
        authority,
        friends,
        email,
        name,
      });
    } catch (e: any) {
      done(e, undefined);
    }
  }
);
