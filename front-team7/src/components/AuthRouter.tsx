import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { userIdState } from '@/store';

interface RequireAuthProps {
  children: React.ReactNode;
}

const AuthRouter = ({ children }: RequireAuthProps) => {
  const userId = useRecoilValue(userIdState);

  if (userId === null) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default AuthRouter;
