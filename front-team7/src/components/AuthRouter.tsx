import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { userState } from '@/store';

interface RequireAuthProps {
  children: React.ReactNode;
}

const AuthRouter = ({ children }: RequireAuthProps) => {
  const user = useRecoilValue(userState);

  if (user === null) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default AuthRouter;
