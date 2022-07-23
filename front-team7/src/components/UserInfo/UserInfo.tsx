import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom'; // 해당 피드를 작성한 유저로 이동시키기 위한 Link
import unknownUser from '@/assets/images/unknown-user.png';
import { Avartar } from '@/components/Avatar';

export interface UserInfoProps {
  name: string;
  image?: string;
  userId: string;
}

export const UserInfo = ({ name, image, userId }: UserInfoProps) => {
  return (
    <StyledUserInfo to={`/profile/${userId}`}>
      <Avartar kind="circle" size="sm" src={image} alt="img1" />
      <span className="userinfo-username">{name}</span>
    </StyledUserInfo>
  );
};

const StyledUserInfo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #333333;

  .userinfo-username {
    font-size: 1.4rem;
    font-weight: bold;
    transition: color 0.3s ease;
  }

  &:hover {
    color: #6b2ea8;
  }

  &:hover {
    color: black;
  }
  &:visited {
    color: black;
  }
`;
