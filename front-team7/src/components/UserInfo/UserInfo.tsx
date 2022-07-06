import styled from 'styled-components';

import { Avartar } from '@/components/Avatar';

export interface IUserInfoProps {
  name: string;
  image?: string;
}

export const UserInfo = ({ name, image }: IUserInfoProps) => {
  return (
    <StyledUserInfo>
      <Avartar kind="circle" size="md" src={image} alt="img1" />
      <span className="userinfo-username">{name}</span>
    </StyledUserInfo>
  );
};

const StyledUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  .userinfo-username {
    font-size: 1.4rem;
    font-weight: bold;
  }
`;
