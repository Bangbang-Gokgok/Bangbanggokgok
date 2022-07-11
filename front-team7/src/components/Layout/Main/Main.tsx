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

export const Main = (props: MainProps & HTMLAttributes<HTMLDivElement>) => {
  const { header, footer, children } = props;
  return (
    <>
      {header && <Header />}
      <StyledMain {...props} role="main">
        {children}
      </StyledMain>
      {footer && <Footer />}
    </>
  );
};

Main.defaultProps = {
  header: true,
  footer: true,
};

const StyledMain = styled.main<MainProps>`
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
