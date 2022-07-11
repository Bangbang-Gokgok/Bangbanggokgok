import { useEffect } from 'react';
import { axios } from '@/lib';
import { useSetRecoilState } from 'recoil';

import { authAtom } from '@/store';

interface LoginResponse {
  access_token: string;
}

export const useLogin = () => {
  const setAuth = useSetRecoilState(authAtom);

  useEffect(() => {
    async function getAccessToken() {
      const { data } = await axios.post<LoginResponse>('/auth/login');
      const { access_token } = data;

      setAuth((prevState) => {
        return { ...prevState, token: access_token };
      });
    }

    getAccessToken().catch((e) => console.log(e));
  }, [setAuth]);
};
