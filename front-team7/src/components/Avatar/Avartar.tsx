import styled from 'styled-components';
import { variant, border, type BorderProps } from 'styled-system';

import { getKindVariant, getSizeVariant } from './Avartar.variant';
import unknown from '@/assets/images/unknown-user.png';

export interface AvartarProps extends BorderProps {
  kind?: 'circle' | 'square';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  src?: string;
  alt?: string;
}

interface AvartarVariants {
  kindVariant: ReturnType<typeof getKindVariant>;
  sizeVariant: ReturnType<typeof getSizeVariant>;
}

export const Avartar = ({
  kind = 'circle',
  size = 'md',
  src = unknown as string,
  alt = 'unknown-user-img',
}: AvartarProps) => {
  const kindVariant = getKindVariant();
  const sizeVariant = getSizeVariant();

  const props = { kind, size, src, alt };

  const variants = {
    kindVariant,
    sizeVariant,
  };

  return (
    <StyledAvartar {...props} {...variants}>
      <img className="avatar-img" src={src} alt={alt} />
    </StyledAvartar>
  );
};

const StyledAvartar = styled.div<AvartarProps & AvartarVariants>`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${({ kindVariant }) => variant(kindVariant)}
  ${({ sizeVariant }) => variant(sizeVariant)}

  ${border}
`;
