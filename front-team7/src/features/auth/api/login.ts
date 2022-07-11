import { useEffect } from 'react';
import { axios } from '@/lib';
import { useSetRecoilState } from 'recoil';
import Cookie from 'js-cookie';

import { authState } from '@/store';

export const useLogin = () => {
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    async function getAccessToken() {
      await axios.get<void>('/auth/login');
      const user = await axios.get('/api/users');
      console.log(user);

      const accessToken = Cookie.get('accessToken');

      setAuth((prevState) => {
        return { ...prevState, token: accessToken };
      });
    }

    getAccessToken().catch((e) => console.log(e));
  }, [setAuth]);
};
