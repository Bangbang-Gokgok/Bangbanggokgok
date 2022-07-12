import { Main } from '@/components/Layout';
import { ProfileEditForm } from '@/features/user';

const ProfileEditPage = () => {
  return (
    <Main bg="#282b37" display="flex" justifyContent="center" alignItems="center" padding={20}>
      <ProfileEditForm />
    </Main>
  );
};

export default ProfileEditPage;
