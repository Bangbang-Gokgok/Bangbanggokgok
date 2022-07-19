import styled from 'styled-components';
import { Link } from 'react-router-dom'; // 해당 피드를 작성한 유저로 이동시키기 위한 Link

import { Avartar } from '@/components/Avatar';

export interface UserInfoProps {
  id: string;
  name: string;
  image?: string;
}

export const UserInfo = ({ id, name, image }: UserInfoProps) => {
  return (
    <Link style={{ color: '#a3a3a3' }} to={`/profile/${id}`}>
      <StyledUserInfo>
        <Avartar kind="circle" size="md" src={image} alt="img1" />
        <span className="userinfo-username">{name}</span>
      </StyledUserInfo>
    </Link>
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
