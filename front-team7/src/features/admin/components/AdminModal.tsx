import { useState, useEffect, type ChangeEvent } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { adminModal } from '@/store';
import { type AllUsers } from '@/api/users';
import { updateOneUserByAdmin, deleteOneUserByAdmin } from '@/api/usersByAdmin';

import { Avartar } from '@/components/Avatar';
import { Backdrop } from '@/components/Backdrop';

interface AdminModalProps {
  userInfo: Partial<AllUsers>;
}

const AUTHORITIES = ['user', 'admin'];

export const AdminModal = ({ userInfo }: AdminModalProps) => {
  const { _id, name, authority, profileImage } = userInfo;
  const [selectedAuthority, setSelectedAuthority] = useState(authority);
  const [adminModalState, setAdminModalState] = useRecoilState(adminModal);
  const filteredAuthorities = AUTHORITIES.filter((auth) => auth !== authority);
  const newProfileImage = profileImage ? profileImage[0] : undefined;

  useEffect(() => {
    if (selectedAuthority === authority) return;

    const requestData = {
      authority: selectedAuthority,
    };

    updateOneUserByAdmin(_id, requestData)
      .then((res) => {
        console.log(res);
        setAdminModalState(false);
      })
      .catch((e) => console.log(e));
  }, [selectedAuthority]);

  function onChangeAuthorityHandler(e: ChangeEvent<HTMLSelectElement>) {
    if (confirm('정말로 해당 유저의 권한을 변경하시겠습니까?'))
      setSelectedAuthority(e.target.value);
  }

  async function onDeleteUser() {
    if (confirm('정말로 해당 유저를 삭제하시겠습니까?')) {
      await deleteOneUserByAdmin(_id);
      setAdminModalState(false);
    }
  }

  return (
    <>
      <Backdrop
        isOpen={adminModalState}
        close={() => setAdminModalState(false)}
        transitionSeconds={0}
      />
      <StyledAdminModal>
        <div className="user-info">
          <Avartar kind="circle" size="md" src={newProfileImage} alt={newProfileImage} />
          <h3>{name}</h3>
        </div>
        <div className="select-box-container">
          <span className="authority-title">권한 설정</span>
          <select
            name="authority"
            id="authority"
            value={selectedAuthority}
            onChange={(e) => onChangeAuthorityHandler(e)}
          >
            <option value={authority}>{authority}</option>
            {filteredAuthorities.map((auth) => (
              <option key={auth} value={auth}>
                {auth}
              </option>
            ))}
          </select>
        </div>
        <div className="user-delete-container">
          <button onClick={onDeleteUser}>회원 삭제</button>
        </div>
      </StyledAdminModal>
    </>
  );
};

const StyledAdminModal = styled.div`
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 200px;
  min-height: 200px;
  padding: 15px;
  border-radius: 7px;
  background-color: whitesmoke;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  transition: all 0.3s ease;

  .user-info {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3px;

    h3 {
      font-size: 1.6rem;
      margin: 0;
    }
  }

  .select-box-container {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin: 5px 0;

    select {
      height: 30px;

      option {
        font-size: 1.5rem;
      }
    }

    .authority-title {
      font-size: 1.5rem;
    }
  }

  .user-delete-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;

    button {
      background-color: #b33030;
      color: whitesmoke;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background-color: #a32d2d;
      }
    }
  }
`;
