import { type ReactNode } from 'react';
import styled from 'styled-components';

interface LoginFormProps {
  children?: ReactNode;
}

export const LoginForm = ({ children }: LoginFormProps) => {
  return <StyledLoginForm>{children}</StyledLoginForm>;
};

const StyledLoginForm = styled.form`
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
