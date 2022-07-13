import { useState, useEffect } from 'react';
import { axios } from '@/lib';
import { useSetRecoilState } from 'recoil';

import { userIdState, type UserIdStateType, type UserResponse } from '@/store';

export const useLogin = () => {
  const [loading, setLoading] = useState(true);
  const setAuth = useSetRecoilState(userIdState);

  useEffect(() => {
    async function getAccessToken(): Promise<UserIdStateType> {
      await axios.get<never, void>('/api/loginCheck'); // access, refresh 갱신하는 api
      const user = await axios.get<never, UserResponse>('/api/users/user'); // user 데이터 가져오는 api

      return user._id;
    }

    getAccessToken()
      .then(setAuth)
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  return { loading };
};
