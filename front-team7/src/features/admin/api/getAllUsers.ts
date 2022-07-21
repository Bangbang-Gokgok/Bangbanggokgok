import { useState, useEffect } from 'react';

import { getAllUsers, type AllUsers } from '@/api/users';

export const useGetAllUsers = () => {
  const [userInfoData, setUserInfoData] = useState<Partial<AllUsers>[] | null>([]);

  useEffect(() => {
    getAllUsers()
      .then((res) => setUserInfoData(res))
      .catch((e) => console.log(e));
  }, [userInfoData]);

  return userInfoData;
};
