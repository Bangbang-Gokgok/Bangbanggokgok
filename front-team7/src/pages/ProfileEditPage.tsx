import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { userFieldQuery } from '@/store';

import { Main } from '@/components/Layout';
import { ProfileEditForm } from '@/features/user/components';
import { ReactNode } from 'react';

const ProfileEditPage = () => {
  const username = useRecoilValue(userFieldQuery('name'));

  return (
    <Main
      bg="#222"
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflowY="visible"
      width="100%"
      height="100%"
    >
      <StyledProfileEditPage>
        <div className="profile-edit-top">
          <span>{username as ReactNode}</span>
          <span>님의 프로필 수정</span>
        </div>
        <ProfileEditForm />
      </StyledProfileEditPage>
    </Main>
  );
};

const StyledProfileEditPage = styled.div`
  width: 100%;

  .profile-edit-top {
    display: none;
    padding: 20px 25px;
    border-top-right-radius: 7px;
    border-top-left-radius: 7px;
    background-color: #3f3144;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    filter: grayscale(30%);

    span {
      &:nth-child(1) {
        color: gold;
        font-size: 3rem;
        font-weight: bold;
      }

      &:nth-child(2) {
        color: white;
        font-size: 2rem;
        font-weight: bold;
        font-style: italic;
      }
    }
  }

  @media screen and (min-width: 768px) {
    width: 80%;
    max-width: 700px;
    margin-top: 20px;
    margin-bottom: 40px;

    .profile-edit-top {
      display: inline-flex;
      align-items: center;
    }
  }

  @media screen and (min-width: 1024px) {
    width: 70%;
    max-width: 850px;
    margin-top: 20px;
    margin-bottom: 40px;

    .profile-edit-top {
      display: inline-flex;
      align-items: center;
    }
  }
`;

export default ProfileEditPage;
