import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authState } from '@/store';

interface RequireAuthProps {
  children: React.ReactNode;
}

const AuthRouter = ({ children }: RequireAuthProps) => {
  const authAtom = useRecoilValue(authState); // Recoil로 userInfo Atoms를 가져오게 변경
  if (authAtom.user === undefined && authAtom.token === undefined) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default AuthRouter;
