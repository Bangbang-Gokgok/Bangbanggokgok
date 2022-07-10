import { MouseEvent } from 'react';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';

import loginLogo from '@/assets/images/login-logo.png';

import { Main } from '@/components/Layout';
import { Avartar } from '@/components/Avatar';

const Login = () => {
  function loginHandler(e: MouseEvent<HTMLButtonElement>, to: string) {
    e.preventDefault();
    window.location.href = to;
  }

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
        <LoginLogoWrapper>
          <Avartar
            kind="circle"
            size="xxl"
            src={loginLogo as string}
            alt="login-logo"
            border="4px solid #ccc"
          />
        </LoginLogoWrapper>

        <LoginTitleWrapper>
          <LoginTitle>여러 발자취들의 만남,</LoginTitle>
          <LoginTitle>
            <span>맵자취(가명)</span> 와 함께하세요 🎉
          </LoginTitle>
        </LoginTitleWrapper>

        <LoginButtonWrapper>
          <LoginButton onClick={(e) => loginHandler(e, '/auth/google')}>
            <span>
              <FcGoogle />
            </span>
            <span>구글 로그인</span>
          </LoginButton>
          <LoginButton onClick={(e) => loginHandler(e, '/auth/kakao')}>
            <span>
              <RiKakaoTalkFill />
            </span>
            <span>카카오 로그인</span>
          </LoginButton>
        </LoginButtonWrapper>
      </LoginForm>
    </Main>
  );
};

const LoginForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 70px 20px;
  width: 300px;
  height: 350px;
  border-radius: 12px;
  background-color: #7f5a83;
  background-image: linear-gradient(315deg, #7f5a83 0%, #0d324d 74%);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
`;

const LoginLogoWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: -20%;
  transform: translate(-50%, 20%);
`;

const LoginTitleWrapper = styled.div``;

const LoginTitle = styled.h2`
  color: whitesmoke;
  font-size: 1.4rem;
  font-weight: normal;
  margin: 2px 0;

  span {
    font-size: 1.6rem;
    color: #dfe918;
  }
`;

const LoginButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  gap: 10px;
  width: 100%;
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  span {
    font-size: 1.4rem;
    font-weight: bold;
    text-align: start;
  }

  &:first-child {
    background-color: #ebebeb;
  }

  &:last-child {
    background-color: #fee500;
  }

  span:first-child {
    display: flex;
    align-items: center;
    width: 30%;
    font-size: 2.5rem;
  }

  span:last-child {
    width: 70%;
  }
`;

export default Login;
