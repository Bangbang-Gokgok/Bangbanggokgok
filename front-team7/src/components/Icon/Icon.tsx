import { type ReactNode, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { variant, color, type ColorProps } from 'styled-system';

import { getKindVariant, getSizeVariant } from './Icon.variant';

export interface IconProps extends ColorProps {
  kind?: 'circle' | 'square';
  size?: 'sm' | 'md';
  element: ReactNode;
}

interface IconVariants {
  kindVariant: ReturnType<typeof getKindVariant>;
  sizeVariant: ReturnType<typeof getSizeVariant>;
}

export const Icon = (props: IconProps & HTMLAttributes<HTMLDivElement>) => {
  const kindVariant = getKindVariant();
  const sizeVariant = getSizeVariant();

  const variants = {
    kindVariant,
    sizeVariant,
  };

  return (
    <StyledIcon {...props} {...variants}>
      {props.element}
    </StyledIcon>
  );
};

Icon.defaultProps = {
  kind: 'circle',
  size: 'md',
};

const StyledIcon = styled.div<IconProps & IconVariants>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  color: whitesmoke;
  background-color: #8d3030;
  padding: 6px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;

  ${({ kindVariant }) => variant(kindVariant)}
  ${({ sizeVariant }) => variant(sizeVariant)}

  ${color}
`;
