import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BiEditAlt } from 'react-icons/bi';

import profileBackground from '@/assets/images/profile-background.jpg';

import { Avartar } from '@/components/Avatar';

const dummyData = [
  { title: '게시글', number: 15 },
  { title: '친구', number: 30 },
];

export const ProfileTop = () => {
  return (
    <StyledProfileTop image={profileBackground as string}>
      <div className="profile-icon">
        <StyledLinkButton to="/profile-edit">
          <BiEditAlt />
        </StyledLinkButton>
      </div>
      <div className="profile-main">
        <Avartar size="xl" />
        <span className="username">홍길동</span>
        <span className="email">honggil@naver.com</span>
        <div className="profile-info-container">
          {dummyData.map(({ title, number }) => (
            <div className="profile-info" key={title}>
              <span className="profile-info-title">{title}</span>
              <span className="profile-info-number">{number}</span>
            </div>
          ))}
        </div>
      </div>
    </StyledProfileTop>
  );
};

const StyledProfileTop = styled.div<{ image: string }>`
  position: relative;
  height: 250px;

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
    opacity: 0.55;
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
      min-width: 62px;
      padding: 6px 0px;
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
