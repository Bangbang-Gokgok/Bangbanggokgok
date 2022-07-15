import { Main } from '@/components/Layout';
import { ProfileEditForm } from '@/features/user/components';

const ProfileEditPage = () => {
  return (
    <Main
      bg="#485461"
      backgroundImage="linear-gradient(315deg, #485461 0%, #28313b 74%)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflowY="visible"
      width="100%"
      height="100%"
    >
      <ProfileEditForm />
    </Main>
  );
};

export default ProfileEditPage;
