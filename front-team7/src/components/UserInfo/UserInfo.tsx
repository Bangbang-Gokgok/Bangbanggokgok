import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom'; // 해당 피드를 작성한 유저로 이동시키기 위한 Link

import { Avartar } from '@/components/Avatar';

export interface UserInfoProps {
  name: string;
  image?: string;
  userId: string;
}

<<<<<<< HEAD
export const UserInfo = ({ name, image, userId }: UserInfoProps) => {
  return (
    <StyledUserInfo to={`/profile/${userId}`}>
      <Avartar kind="circle" size="sm" src={image} alt="img1" />
=======
export const UserInfo = ({ name, image, userId }: UserInfoProps & { userId: string; }) => {
  return (
    <StyledUserInfo to={`/profile/${userId}`} >
      <Avartar kind="circle" size="md" src={image} alt="img1" />
>>>>>>> 3ea6173b9a3f1c9362cb8e4950f4b643bd4ae2e0
      <span className="userinfo-username">{name}</span>
    </StyledUserInfo >
  );
};

<<<<<<< HEAD
const StyledUserInfo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #333333;
=======
const StyledUserInfo = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 5px;
  color: black;
>>>>>>> 3ea6173b9a3f1c9362cb8e4950f4b643bd4ae2e0

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
    color: black
  }
`;
