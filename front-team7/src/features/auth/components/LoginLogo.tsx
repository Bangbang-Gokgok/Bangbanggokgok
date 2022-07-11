import styled from 'styled-components';

import loginLogo from '@/assets/images/login-logo.png';

import { Avartar } from '@/components/Avatar';

export const LoginLogo = () => {
  return (
    <StyledLoginLogo>
      <Avartar
        kind="circle"
        size="xxl"
        src={loginLogo as string}
        alt="login-logo"
        border="4px solid #ccc"
      />
    </StyledLoginLogo>
  );
};

const StyledLoginLogo = styled.div`
  position: absolute;
  left: 50%;
  top: -20%;
  transform: translate(-50%, 20%);
`;
