import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom'; // 해당 피드를 작성한 유저로 이동시키기 위한 Link
import unknownUser from '@/assets/images/unknown-user.png';
import { Avartar } from '@/components/Avatar';

export interface UserInfoProps {
  name: string;
  image?: string;
}

export const UserInfo = ({ name, image, userId }: UserInfoProps & { userId: string }) => {
  return (
    <StyledUserInfo to={`/profile/${userId}`}>
      <Avartar kind="circle" size="md" src={image || (unknownUser as string)} alt="img1" />
      <span className="userinfo-username">{name}</span>
    </StyledUserInfo>
  );
};

const StyledUserInfo = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 5px;
  color: black;

  .userinfo-username {
    font-size: 1.4rem;
    font-weight: bold;
  }

  &:hover {
    color: black;
  }
  &:visited {
    color: black;
  }
`;
