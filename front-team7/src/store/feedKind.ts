import { atom } from 'recoil';

export const FEED_KIND_HOME = 'HOME';
export const FEED_KIND_PROFILE = 'PROFILE';

export const feedKindState = atom<string>({
  key: 'FeedKindState',
  default: FEED_KIND_HOME,
});
