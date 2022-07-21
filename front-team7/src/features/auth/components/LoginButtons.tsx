import { MouseEvent } from 'react';
import styled from 'styled-components';

import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';

export const LoginButtons = () => {
  function loginHandler(e: MouseEvent<HTMLButtonElement>, to: string) {
    e.preventDefault();
    if (process.env.NODE_ENV !== 'development') {
      window.location.href = 'http://kdt-sw2-seoul-team07.elicecoding.com:5000' + to;
    } else {
      window.location.href = to;
    }
  }

  return (
    <StyledLoginButtonsWrapper>
      <StyledGoogleButton onClick={(e) => loginHandler(e, '/auth/google')}>
        <span>
          <FcGoogle />
        </span>
        <span>구글 로그인</span>
      </StyledGoogleButton>

      <StyledKakaoButton onClick={(e) => loginHandler(e, '/auth/kakao')}>
        <span>
          <RiKakaoTalkFill />
        </span>
        <span>카카오 로그인</span>
      </StyledKakaoButton>
    </StyledLoginButtonsWrapper>
  );
};

const StyledLoginButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  gap: 10px;
  width: 100%;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  span {
    text-align: start;

    &:first-child {
      display: flex;
      align-items: center;
      width: 30%;
      font-size: 2.5rem;
    }

    &:last-child {
      width: 70%;
      font-size: 1.4rem;
      font-weight: bold;
    }
  }
`;

const StyledGoogleButton = styled(StyledButton)`
  background-color: #ebebeb;
`;

const StyledKakaoButton = styled(StyledButton)`
  background-color: #fee500;
`;
