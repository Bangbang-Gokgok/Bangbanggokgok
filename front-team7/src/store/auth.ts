import { atom } from 'recoil';

interface AuthAtom {
  user: null | {
    id: string;
    email: string;
    role: string;
    phone?: string;
    address?: string;
  };
  token: null | string;
}

const authDefaultState: AuthAtom = {
  user: null,
  token: null,
};

const authAtom = atom({
  key: 'auth',
  default: authDefaultState,
});

export { authAtom };
