import styled from 'styled-components';
import { variant, border, type BorderProps } from 'styled-system';

import { getKindVariant, getSizeVariant } from './Avartar.variant';
import unknown from '@/assets/images/unknown-user.png';

export interface AvartarProps extends BorderProps {
  kind?: 'circle' | 'square';
  size?: 'sm' | 'md' | 'lg' | 'xxl';
  src?: string;
  alt?: string;
}

interface AvartarVariants {
  kindVariant: ReturnType<typeof getKindVariant>;
  sizeVariant: ReturnType<typeof getSizeVariant>;
}

export const Avartar = (props: AvartarProps) => {
  const kindVariant = getKindVariant();
  const sizeVariant = getSizeVariant();
  const src = props.src || (unknown as string);
  const alt = props.alt || 'unknown-user-img';

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
  border: ${(props) => (props.src ? 'none' : '2px solid #ccc')};

  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${({ kindVariant }) => variant(kindVariant)}
  ${({ sizeVariant }) => variant(sizeVariant)}

  ${border}
`;

Avartar.defaultProps = {
  kind: 'circle',
  size: 'md',
};
