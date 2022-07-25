import { atom } from 'recoil';

export const sliderState = atom<boolean>({
  key: 'Slider',
  default: false,
});
