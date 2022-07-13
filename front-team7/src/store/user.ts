import { atom, selector, selectorFamily } from 'recoil';

import { axios } from '@/lib';

export type UserIdStateType = string | null;

export interface UserResponse {
  _id: string;
  email: string;
  name: string;
  profileImage?: string;
  contactNumber?: number;
  address?: string;
  location?: string;
  description?: string;
  authority: string;
  friends: string[] | [];
  refreshToken?: string;
  iat: number;
  exp: number;
}

export const userIdState = atom<UserIdStateType>({
  key: 'UserId',
  default: null,
});

export const userQuery = selectorFamily({
  key: 'UserQuery',
  get: (userId: UserIdStateType) => async () => {
    if (!userId) return;
    try {
      console.log(userId);
      const user = await axios.get<never, UserResponse>(`/api/users/${userId}`);
      return user;
    } catch (e) {
      console.log(e);
    }
  },
});

export const userFeedsQuery = selectorFamily({
  key: 'UserFeedsQuery',
  get: (userId: UserIdStateType) => async () => {
    if (!userId) return;

    try {
      const feeds = await axios.get(`/api/feeds/list/${userId}`);
      return feeds;
    } catch (e) {
      console.log(e);
    }

    return [];
  },
});

export const currentUserQuery = selector({
  key: 'CurrentUserQuery',
  get: ({ get }) => get(userQuery(get(userIdState))),
});

export const currentUserFeedsQuery = selector({
  key: 'CurrentUserFeedsQuery',
  get: ({ get }) => get(userFeedsQuery(get(userIdState))),
});
