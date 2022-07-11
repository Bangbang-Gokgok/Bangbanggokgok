import { Navigate } from 'react-router-dom';

interface RequireAuthProps {
  children: React.ReactNode;
}

const AuthRouter = ({ children }: RequireAuthProps) => {
  const userInfo = { token: true }; // Recoil로 userInfo Atoms를 가져오게 변경
  if (!userInfo.token) return <Navigate to="/signin" />;

  return <>{children}</>;
};

export default AuthRouter;
