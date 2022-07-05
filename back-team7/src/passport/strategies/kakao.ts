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
    password: 'kakao-oauth', //나중에 random password로 바꾸고 비밀번호를 찾고싶으면
    //비밀번호 분실 로직은 사용하여 찾을 수 있게 하자....
  });

  return created;
}

module.exports = new KakaoStrategy(
  config,
  async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    const name = profile._json.properties.nickname;
    const email = profile._json.kakao_account.email;
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
  }
);
