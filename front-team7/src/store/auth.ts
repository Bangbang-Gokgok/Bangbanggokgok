import { atom, selector } from 'recoil';

interface AuthState {
  user: null | {
    id: string;
    email: string;
    role: string;
    phone?: string;
    address?: string;
  };
  token?: null | string;
}

export const authState = atom<AuthState>({
  key: 'Auth',
  default: {
    user: null,
    token: null,
  },
});
