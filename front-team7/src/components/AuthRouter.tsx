import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { authState } from '@/store';

interface RequireAuthProps {
  children: React.ReactNode;
}

const AuthRouter = ({ children }: RequireAuthProps) => {
  const authAtom = useRecoilValue(authState);

  console.log(authAtom);
  if (authAtom === undefined) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default AuthRouter;
