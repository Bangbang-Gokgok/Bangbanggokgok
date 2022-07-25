import { atom, selector, selectorFamily } from 'recoil';

import { userFeedsQuery } from '@/store';
import { getUserById, type UserByIdDto } from '@/features/user/api';

export const userParamsState = atom<string | undefined | null>({
  key: 'UserParams',
  default: null,
});

export const userByIdQuery = selector({
  key: 'UserByIdQuery',
  get: async ({ get }) => {
    const user = await getUserById(get(userParamsState));
    return user;
  },
});

export const userByIdFieldQuery = selectorFamily({
  key: 'UserByIdFieldQuery',
  get:
    (field: keyof UserByIdDto) =>
    ({ get }) =>
      get(userByIdQuery)[field],
});

export const userByIdFeedsQuery = selector({
  key: 'UserByIdFeedsQuery',
  get: ({ get }) => get(userFeedsQuery(get(userParamsState))),
});
