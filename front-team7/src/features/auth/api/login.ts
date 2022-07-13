import { useState, useEffect } from 'react';
import { axios } from '@/lib';
import { useSetRecoilState } from 'recoil';

import { authState, type AuthState } from '@/store';

export const useLogin = () => {
  const [loading, setLoading] = useState(true);
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    async function getAccessToken() {
      await axios.get<void>('/api/loginCheck'); // access, refresh 갱신하는 api
      const user = await axios.get<AuthState>('/api/users/user'); // user 데이터 가져오는 api
      return user;
    }

    getAccessToken()
      .then(setAuth)
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  return { loading };
};
