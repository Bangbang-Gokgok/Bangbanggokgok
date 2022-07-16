import styled from 'styled-components';

import { Main } from '@/components/Layout';
import { ProfileEditForm } from '@/features/user/components';

const ProfileEditPage = () => {
  return (
    <Main
      bg="#282b37"
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflowY="visible"
      width="100%"
      height="100%"
    >
      <StyledProfileEditPage>
        <ProfileEditForm />
      </StyledProfileEditPage>
    </Main>
  );
};

const StyledProfileEditPage = styled.div`
  width: 100%;
  max-width: 500px;
`;

export default ProfileEditPage;
