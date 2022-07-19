import { atom } from 'recoil';

export const adminModal = atom<boolean>({
  key: 'AdminModal',
  default: false,
});
