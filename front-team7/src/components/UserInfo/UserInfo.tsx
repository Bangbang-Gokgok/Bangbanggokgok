import styled from 'styled-components';
import { Link } from 'react-router-dom'; // 해당 피드를 작성한 유저로 이동시키기 위한 Link

import { Avartar } from '@/components/Avatar';

export interface UserInfoProps {
  name: string;
  image?: string;
}

export const UserInfo = ({ name, image }: UserInfoProps) => {
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
