import { type ReactNode } from 'react';
import styled from 'styled-components';

import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';

interface IMainProps {
  children?: ReactNode;
}

export const Main = ({ children }: IMainProps) => {
  return (
    <>
      <Header />
      <StlyedMain role="main">{children}</StlyedMain>
      <Footer />
    </>
  );
};

const StlyedMain = styled.main`
  width: 90vw;
  margin: 10px auto;
`;
