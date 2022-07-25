import { axios } from '@/lib';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { userState } from '@/store';

export const useLogout = () => {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  async function logout() {
    await axios.get('/api/logout');
    setUser(null);
    navigate('/login');
  }

  return logout;
};
