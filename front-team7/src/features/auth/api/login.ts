import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { axios } from '@/lib';
import { userState, type UserState } from '@/store';
import { getCurrentUser } from '@/features/user/api';

export const useLogin = () => {
  const [loading, setLoading] = useState(true);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    async function getAccessToken(): Promise<UserState> {

      await axios.get<never, void>('/api/loginCheck'); // access, refresh 갱신하는 api
      const user = await getCurrentUser(); // user 데이터 가져오는 api

      const newUser: UserState & { _id?: string; updatedAt?: string; refreshToken?: string; } = {
        ...user,
        id: user._id,
      };

      delete newUser._id;
      delete newUser.updatedAt;
      delete newUser.refreshToken;

      return newUser;
    }

    getAccessToken()
      .then(setUser)
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  return { loading };
};
