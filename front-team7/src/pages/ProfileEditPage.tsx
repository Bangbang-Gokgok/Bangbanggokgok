import { Main } from '@/components/Layout';
import { ProfileEditForm } from '@/features/user';

const ProfileEditPage = () => {
  return (
    <Main
      bg="#485461"
      backgroundImage="linear-gradient(315deg, #485461 0%, #28313b 74%)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflowY="visible"
    >
      <ProfileEditForm />
    </Main>
  );
};

export default ProfileEditPage;
