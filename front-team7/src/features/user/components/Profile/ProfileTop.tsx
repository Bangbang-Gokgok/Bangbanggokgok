import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import { BiEditAlt } from 'react-icons/bi';

import profileBackground from '@/assets/images/profile-background.jpg';

import { Avartar } from '@/components/Avatar';
import { userFieldQuery, userParamsState, userByIdQuery, userByIdFeedsQuery } from '@/store';

export const ProfileTop = () => {
  const currentUserId = useRecoilValue(userFieldQuery('id'));
  const user = useRecoilValue(userByIdQuery);
  const userId = useRecoilValue(userParamsState);
  const feeds = useRecoilValue(userByIdFeedsQuery);

  return (
    <StyledProfileTop image={profileBackground as string}>
      {currentUserId === userId && (
        <div className="profile-icon">
          <StyledLinkButton to="/profile-edit">
            <BiEditAlt />
          </StyledLinkButton>
        </div>
      )}

      <div className="profile-main">
        <Avartar size="xl" src={user?.profileImage ? user.profileImage[0] : undefined} />
        <span className="username">{user?.name}</span>
        <span className="email">{user?.email}</span>
        <div className="profile-info-container">
          <div className="profile-info">
            <span className="profile-info-title">게시글</span>
            <span className="profile-info-number">{feeds!.length > 0 ? feeds!.length : 0}</span>
          </div>
          <div className="profile-info">
            <span className="profile-info-title">팔로워</span>
            <span className="profile-info-number">0</span>
          </div>
        </div>
      </div>
    </StyledProfileTop>
  );
};

const StyledProfileTop = styled.div<{ image: string }>`
  position: relative;
  min-height: 250px;

  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: ${({ image }) => `url(${image})`};
    background-size: cover;
    filter: grayscale(80%);
    opacity: 0.6;
  }

  .profile-icon {
    position: absolute;
    right: 0;
    padding: 8px;
  }

  .profile-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: whitesmoke;
    gap: 3px;

    .username {
      font-size: 1.75rem;
      font-weight: bold;
    }

    .email {
      font-size: 1.4rem;
    }
  }

  .profile-info-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    font-size: 1.4rem;
    color: black;
    gap: 6px;

    .profile-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 56px;
      padding: 6px;
      height: 100%;
      border-radius: 5px;
      background-color: #f3f6fb;
      box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;

      .profile-info-title {
        color: #2f2f2f;
        font-weight: bold;
      }

      .profile-info-number {
      }
    }
  }

  @media screen and (min-width: 768px) {
    min-height: 350px;

    .profile-main {
      gap: 5px;

      .username {
        font-size: 1.8rem;
        font-weight: bold;
      }

      .email {
        font-size: 1.5rem;
      }
    }

    .profile-info-container {
      gap: 8px;

      .profile-info {
        width: 60px;
        padding: 8px;
        height: 100%;
        border-radius: 5px;
      }
    }
  }

  @media screen and (min-width: 1024px) {
  }
`;

const StyledLinkButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  color: whitesmoke;
  height: 45px;
  width: 45px;
  background-color: #8d3030;
  border-radius: 50%;
  padding: 6px;
  transition: color 0.3s ease;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;

  &:hover {
    color: gold;
  }
`;
