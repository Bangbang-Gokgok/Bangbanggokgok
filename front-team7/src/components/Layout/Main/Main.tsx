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

interface IMainProps extends SpaceProps, LayoutProps, ColorProps, BackgroundProps, FlexboxProps {
  header?: boolean;
  footer?: boolean;
  gap?: number | string;
  children?: ReactNode;
}

export const Main = ({
  header,
  footer,
  children,
  ...props
}: IMainProps & HTMLAttributes<HTMLDivElement>) => {
  return (
    <>
      {header && <Header />}
      <StlyedMain role="main" {...props}>
        {children}
      </StlyedMain>
      {footer && <Footer />}
    </>
  );
};

const StlyedMain = styled.main<IMainProps>`
  width: 100vw;
  height: 100vh;

  ${system({ gap: true })}
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
