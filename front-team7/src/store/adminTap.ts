import { atom } from 'recoil';

export const adminTapState = atom<string>({
  key: 'AdminTapState',
  default: '회원관리',
});
