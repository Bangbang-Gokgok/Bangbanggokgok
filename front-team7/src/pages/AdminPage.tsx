import { type ReactNode } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { userFieldQuery } from '@/store';

import { Main } from '@/components/Layout';
import { AdminTap } from '@/features/admin/components';

const AdminPage = () => {
  const username = useRecoilValue(userFieldQuery('name'));
  const authority = useRecoilValue(userFieldQuery('authority'));

  return (
    <Main bg="#282b37">
      <StyledAdminPage>
        <div className="admin-top">
          <span>{username as ReactNode} </span>
          <span>관리자님 환영합니다.</span>
        </div>
        <AdminTap />
      </StyledAdminPage>
    </Main>
  );
};

const StyledAdminPage = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  .admin-top {
    span:nth-child(1) {
      color: gold;
      font-size: 2.5rem;
      font-weight: bold;
    }
    span:nth-child(2) {
      color: whitesmoke;
    }
  }

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

export default AdminPage;
