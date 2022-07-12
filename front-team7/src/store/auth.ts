import { atom, selector } from 'recoil';

import { type AxiosResponse } from 'axios';

export interface AuthState {
  _id: string;
  email: string;
  name: string;
  authority: string;
  iat: number;
  exp: number;
}

export const authState = atom<AxiosResponse<AuthState> | null>({
  key: 'Auth',
  default: null,
});
