import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { Main } from '@/components/Layout';
import { ProfileTop, ProfileMid, ProfileBot } from '@/features/user/components';
import { userParamsState } from '@/store';

const ProfilePage = () => {
  const setUser = useSetRecoilState(userParamsState);
  const { userId } = useParams();
  setUser(userId);

  return (
    <Main bg="#222">
      <StyledProfilePage>
        <ProfileTop />
        <ProfileMid />
        <ProfileBot />
      </StyledProfilePage>
    </Main>
  );
};

const StyledProfilePage = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  margin: 0 auto;
  max-width: 850px;
  background-color: #2e2930;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  @media screen and (min-width: 768px) {
    width: 80%;
    max-width: 700px;
    margin: 40px auto;
  }

  @media screen and (min-width: 1024px) {
    width: 70%;
    max-width: 850px;
  }
`;

export default ProfilePage;
