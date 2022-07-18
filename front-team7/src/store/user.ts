import { atom, selector, selectorFamily, type RecoilState } from 'recoil';

import { axios } from '@/lib';

export interface UserState {
  id?: string;
  email?: string;
  name?: string;
  authority?: string;
  createdAt?: string;
  description?: string;
  profileImage?: string[];
  contactNumber?: string;
  address?: string;
  location?: {
    lat: number;
    lng: number;
  };
  friends?: string[] | [];
}

export interface UserResponse {
  _id: string;
  email: string;
  name: string;
  authority: string;
  description?: string;
  profileImage?: string[];
  contactNumber?: string;
  address?: string;
  location?: {
    lat: number;
    lng: number;
  };
  friends?: string[] | [];
  refreshToken?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const userState = atom<UserState | null>({
  key: 'User',
  default: null,
});

export const userFieldQuery = selectorFamily({
  key: 'UserFieldQuery',
  get:
    (field: keyof UserState) =>
    ({ get }) => {
      if (userState === null) return undefined;
      return get(userState)![field];
    },
  set:
    (field: keyof UserState) =>
    ({ set }, newValue) =>
      set(userState, (prevState) => {
        return { ...prevState, [field]: newValue };
      }),
});

export const userFeedsQuery = selectorFamily({
  key: 'UserFeedsQuery',
  get: (userId: string) => async () => {
    if (!userId) return;

    try {
      const feeds = await axios.get<never, string[]>(`/api/feeds/list/${userId}`);
      return feeds;
    } catch (e) {
      console.log(e);
    }

    return [];
  },
});

export const currentUserFeedsQuery = selector({
  key: 'CurrentUserFeedsQuery',
  get: ({ get }) => get(userFeedsQuery(get(userFieldQuery('id') as RecoilState<string>))),
});
