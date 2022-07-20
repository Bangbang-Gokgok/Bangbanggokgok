import { useState } from 'react';
import styled from 'styled-components';
import { AiFillSetting } from 'react-icons/ai';
import { useRecoilState } from 'recoil';

import { adminModal } from '@/store';
import { useGetAllUsers } from '@/features/admin/api';

import { AdminModal, UserInfo } from '@/features/admin/components';

export const AdminUser = () => {
  const userInfoData = useGetAllUsers();
  const [adminModalState, setAdminModalState] = useRecoilState(adminModal);
  const [userInfoDataIndex, setUserInfoDataIndex] = useState(0);

  if (!userInfoData || userInfoData.length === 0) return <div>유저 정보가 없습니다.</div>;

  const filteredUserInfoData = userInfoData?.filter((userInfo) => userInfo.authority !== 'admin');

  function onOpenAdminModalHandler(index: number) {
    setUserInfoDataIndex(index);
    setAdminModalState(true);
  }

  return (
    <StyledAdminUser>
      <ul className="userInfo-ul">
        {filteredUserInfoData?.map((userInfo, index) => {
          const profileImage = userInfo?.profileImage ? userInfo?.profileImage[0] : undefined;

          return (
            <li className="userInfo-list" key={userInfo._id}>
              <UserInfo
                id={userInfo._id as string}
                name={userInfo.name as string}
                image={profileImage}
              />
              <button onClick={() => onOpenAdminModalHandler(index)} className="icon-setting">
                <AiFillSetting />
              </button>
            </li>
          );
        })}
      </ul>
      {adminModalState && <AdminModal userInfo={filteredUserInfoData[userInfoDataIndex]} />}
    </StyledAdminUser>
  );
};

const StyledAdminUser = styled.div`
  .userInfo-ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 0;
    padding: 10px;

    .userInfo-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 7px;
      color: #a3a3a3;
      list-style: none;
      padding: 6px 12px;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

      .icon-setting {
        display: flex;
        align-items: center;
        font-size: 2rem;
        background: none;
        border: none;
        padding: 3px 6px;
        color: #a3a3a3;
        transition: color 0.3s ease;
        cursor: pointer;

        &:hover {
          color: gold;
        }
      }
    }
  }
`;
