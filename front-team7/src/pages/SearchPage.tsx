import styled from 'styled-components';
import { Main } from '@/components/Layout';
import { UserInfo } from '@/components/UserInfo';
import Input from '@/components/Input/Input';
import unknownUser from '@/assets/images/unknown-user.png';
import React, { useEffect, useState } from 'react';
import { userState } from '@/store';
import { useRecoilValue } from 'recoil';
import { axios } from '@/lib';
// import * as UserApiByUser from '@/api/users';
// import * as UserApiByAdmin from '@/api/usersByAdmin';
// import { useEffect, useState } from 'react';
// import { Types } from 'mongoose';



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

interface userData {
  _id: string,
  name: string,
  profileImage: Array<string>;
}

type userDataList = Array<userData>;

const SearchPage = () => {
  const [searchUserList, setSearchUserList] = useState<userDataList>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const currentUser = useRecoilValue(userState);
  useEffect(() => {
    console.log(currentUser?.friends);

    const searchUser = async (keyword: string) => {
      const result = await axios.get(`/api/users/list?keyword=${keyword}`);
      console.log(result);
    };

    searchUser('정현');

    const mockData = [
      {
        "_id": "2gPRjW-t2",
        "name": "김정현",
        "profileImage": [],
        "friends": []
      },
      {
        "_id": "C638LX3Po",
        "name": "김정현",
        "profileImage": [],
        "friends": []
      }
    ];

    setSearchUserList(mockData);

  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const onClickSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.target);

  };

  return (
    <Main
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'flex-start'}
      alignItems={'center'}
    >
      <StyledSearchContainer>
        <Input
          handleInput={(e) => handleInput(e)}
          onClickSearch={(e) => onClickSearch(e)}
        />
        {
          searchUserList.map((user, idx) => (
            <StyledUserInfoWrapper key={idx}>
              <UserInfo name={user.name} image={user.profileImage[0] || unknownUser as string}></UserInfo>
              <StyledFollowButton isfollowed={false} />
            </StyledUserInfoWrapper>
          ))
        }
      </StyledSearchContainer>
    </Main>
  );
};

const StyledFollowButton = styled.button<{ isfollowed: boolean; }>`
  border: none;
  background-color: transparent;
  color: #487eb0;
  cursor: pointer;
  &::after{
    content: ${(props) => props.isfollowed ? '"팔로잉 취소"' : '"팔로우"'};
  }
  &:hover {
    color: #67a2d9;
  }
  &:visited {
    color: #487eb0;
  }
`;

const StyledUserInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
`;

const StyledSearchContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
`;

export default SearchPage;
