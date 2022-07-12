import { useEffect } from 'react';
import { axios } from '@/lib';
import { useSetRecoilState } from 'recoil';

import { authState, type AuthState } from '@/store';

export const useLogin = () => {
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    async function getAccessToken() {
      await axios.get<void>('/api/loginCheck'); // access, refresh 갱신하는 api
      const user = await axios.get<AuthState>('/api/users/user'); // user 데이터 가져오는 api

      setAuth(user);
    }

    getAccessToken().catch((e) => console.log(e));
  }, []);
};
