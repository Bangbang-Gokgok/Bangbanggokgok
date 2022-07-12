import styled from 'styled-components';
import { Main } from '@/components/Layout';
import { UserInfo } from '@/components/UserInfo';
import Input from '@/components/Input/Input';
import unknownUser from '@/assets/images/unknown-user.png';
// import * as UserApiByUser from '@/api/users';
// import * as UserApiByAdmin from '@/api/usersByAdmin';
// import { useEffect, useState } from 'react';
// import { Types } from 'mongoose';

const StyledSearchContainer = styled.div`
  width: 330px;
  // background: lightgray;
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-itmes: center;
  padding: 40px 10px;
  gap: 35px;
`;

// 아래는 User Schema의 CRUD 가 정상적으로 작동하는지 확인하는 임시 코드

// interface User {
//   _id: Types.ObjectId | string;
//   authority: string;
//   email: string;
//   name: string;
//   // profileImage?: string | undefined;
//   // contactNumber?: number | undefined;
//   // location?: object | undefined;
//   // friends?: Array<string> | undefined;
//   iat: Number;
//   exp: Number;
// }

// 유저 기능

/*
async function getMyInfo() {
  const usersData: User = await UserApiByUser.getMyUserInfo();
  console.log('내 userData 가져오기 : ', usersData);
}

async function getAll() {
  const usersData: User = await UserApiByUser.getAllUsers();
  console.log('모든 usersData 가져오기 : ', usersData);
}

async function updateMyInfo() {
  const updateData = {
    name: '수정된 김지환',
    email: 'updateKJH@naver.com',
  };
  const myupdatedData: User = await UserApiByUser.updateUser(updateData);
  console.log('update 된 내 userData 가져오기 : ', myupdatedData);
}

async function deleteMyInfo() {
  const mydeletedData: User = await UserApiByUser.deleteUser();
  console.log('delete 결과 message : ', mydeletedData);
}
*/

// 관리자 기능

/*
async function updateByAdmin() {
  const updateData = {
    name: '알!루',
    email: 'allu!@naver.com',
  };
  const id = '62c414db2fbbf977d491ab5d';
  const usersData: User = await UserApiByAdmin.updateOneUserByAdmin(id, updateData);
  console.log('유저 업데이트 : ', usersData);
}


async function deleteByAdmin() {
  if (confirm('정말 삭제?')) {
    const id = '62cce79f7819b1c5142e074c';
    const result: User = await UserApiByAdmin.deleteOneUserByAdmin(id);
    console.log('유저 삭제 : ', result);
  }
}
*/

const SearchPage = () => {
  // useEffect(() => {
  //   // updateByAdmin();
  //   // deleteByAdmin();
  //   // updateMyInfo();
  //   // deleteMyInfo();
  //   // getMyInfo();
  //   // getAll();
  // }, []);
  let name = '김지환';
  return (
    <Main
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'flex-start'}
      alignItems={'center'}
    >
      <StyledSearchContainer>
        {/* <button
          onClick={() => {
            if (confirm('자신의 정보를 삭제하시겠습니까??')) {
              deleteMyInfo();
            }
          }}
        >삭제</button> */}
        <Input></Input>
        <UserInfo name={name} image={unknownUser as string}></UserInfo>
        <UserInfo name={name} image={unknownUser as string}></UserInfo>
        <UserInfo name={name} image={unknownUser as string}></UserInfo>
        <UserInfo name={name} image={unknownUser as string}></UserInfo>
        <UserInfo name={name} image={unknownUser as string}></UserInfo>
        <UserInfo name={name} image={unknownUser as string}></UserInfo>
        <UserInfo name={name} image={unknownUser as string}></UserInfo>
        <UserInfo name={name} image={unknownUser as string}></UserInfo>
        <UserInfo name={name} image={unknownUser as string}></UserInfo>
        <UserInfo name={name} image={unknownUser as string}></UserInfo>
        <UserInfo name={name} image={unknownUser as string}></UserInfo>
        <UserInfo name={name} image={unknownUser as string}></UserInfo>
        <UserInfo name={name} image={unknownUser as string}></UserInfo>
      </StyledSearchContainer>
    </Main>
  );
};

export default SearchPage;
