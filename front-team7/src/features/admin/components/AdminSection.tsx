import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { adminTapState } from '@/store';

import { AdminUser, AdminFeed } from '@/features/admin/components';

export const AdminSection = () => {
  const selectedTap = useRecoilValue(adminTapState);

  return (
    <StyledAdminTap>
      {selectedTap === '회원관리' && <AdminUser />}
      {selectedTap === '피드관리' && <AdminFeed />}
    </StyledAdminTap>
  );
};

const StyledAdminTap = styled.section`
  background-color: #2e2930;
`;
