import styled from 'styled-components';

import { Main } from '@/components/Layout';
import { ProfileTop, ProfileMid, ProfileBot } from '@/features/user/components';

const ProfilePage = () => {
  return (
    <Main bg="#282b37">
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
  height: 100%;
  flex-direction: column;
  margin: 0 auto;
  max-width: 850px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

export default ProfilePage;
