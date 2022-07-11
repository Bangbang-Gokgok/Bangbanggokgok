import { Main } from '@/components/Layout';
import { ProfileTop, ProfileMid } from '@/features/user';

const ProfilePage = () => {
  return (
    <Main bg="#485461" backgroundImage="linear-gradient(315deg, #485461 0%, #28313b 74%)">
      <ProfileTop />
      <ProfileMid />
    </Main>
  );
};

export default ProfilePage;
