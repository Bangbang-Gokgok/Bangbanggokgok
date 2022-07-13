import { useRecoilValue } from 'recoil';
import { Navigate } from 'react-router-dom';

import { Main } from '@/components/Layout';
import { LoginForm, LoginLogo, LoginTitle, LoginButtons } from '@/features/auth';

import { authState } from '@/store';

const LoginPage = () => {
  const authAtom = useRecoilValue(authState);

  if (authAtom !== null) return <Navigate to="/" />;

  return (
    <Main
      header={false}
      footer={false}
      bg="#485461"
      backgroundImage="linear-gradient(315deg, #485461 0%, #28313b 74%)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={20}
    >
      <LoginForm>
        <LoginLogo />
        <LoginTitle />
        <LoginButtons />
      </LoginForm>
    </Main>
  );
};

export default LoginPage;
