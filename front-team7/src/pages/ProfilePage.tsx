import { Main } from '@/components/Layout';
import { ProfileTop, ProfileMid, ProfileBot } from '@/features/user';

const ProfilePage = () => {
  return (
    <Main bg="#282b37">
      <ProfileTop />
      <ProfileMid />
      <ProfileBot />
    </Main>
  );
};

export default ProfilePage;
