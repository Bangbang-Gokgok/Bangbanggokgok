import { type ReactNode, HTMLAttributes } from 'react';
import styled from 'styled-components';
import {
  system,
  space,
  layout,
  color,
  background,
  flexbox,
  type SpaceProps,
  type LayoutProps,
  type ColorProps,
  type BackgroundProps,
  type FlexboxProps,
} from 'styled-system';

import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';

interface MainProps extends SpaceProps, LayoutProps, ColorProps, BackgroundProps, FlexboxProps {
  header?: boolean;
  footer?: boolean;
  gap?: number | string;
  children?: ReactNode;
}

<<<<<<< HEAD
export const Main = (props: IMainProps & HTMLAttributes<HTMLDivElement>) => {
=======
export const Main = (props: MainProps & HTMLAttributes<HTMLDivElement>) => {
>>>>>>> c4986d3a6a31928b42f3976ba015edc7b8bd60e7
  return (
    <>
      {props.header && <Header />}
      <StyledMain role="main" {...props}>
        {props.children}
      </StyledMain>
      {props.footer && <Footer />}
    </>
  );
};

<<<<<<< HEAD
const StyledMain = styled.main<IMainProps>`
=======
const StyledMain = styled.main<MainProps>`
>>>>>>> c4986d3a6a31928b42f3976ba015edc7b8bd60e7
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  padding-top: ${({ header }) => (header ? '80px' : '0')};
  padding-bottom: ${({ footer }) => (footer ? '70px' : '0')};

  ${system({
    gap: true,
  })}

  ${space}
  ${layout}
  ${color}
  ${background}
  ${flexbox}
`;

Main.defaultProps = {
  header: true,
  footer: true,
};
