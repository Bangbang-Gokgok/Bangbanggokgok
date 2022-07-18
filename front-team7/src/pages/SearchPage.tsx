import styled from 'styled-components';
import { Main } from '@/components/Layout';
import { UserInfo } from '@/components/UserInfo';
import Input from '@/components/Input/Input';
import unknownUser from '@/assets/images/unknown-user.png';
import { useEffect, useState } from 'react';
import { currentUserQuery } from '@/store';
import { useRecoilValue } from 'recoil';
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
  const currentUser = useRecoilValue(currentUserQuery);
  useEffect(() => {
    console.log(currentUser);

    const mockData = [
      {
        "_id": "efukkgJ4B",
        "name": "Ik Yoon",
        "profileImage": []
      },
      {
        "_id": "bCJcG23WB",
        "name": "YongJae Wonderss",
        "profileImage": [
          "https://gabang-bucket.s3.ap-northeast-2.amazonaws.com/1658010722813_7a844d66-5600-436f-a78f-157d1a8cdc3e.png"
        ]
      },
      {
        "_id": "2gPRjW-t2",
        "name": "김정현",
        "profileImage": []
      },
      {
        "_id": "EUNUFXYeq",
        "name": "배윤주",
        "profileImage": []
      },
      {
        "_id": "lGl0AOVlG",
        "name": "김지환",
        "profileImage": [
          "https://gabang-bucket.s3.ap-northeast-2.amazonaws.com/1657765593898_7.6%20%C3%AA%C2%B2%C2%8C%C3%AB%C2%8D%C2%94%C3%AD%C2%83%C2%80%C3%AC%C2%9A%C2%B4%20%C3%AC%C2%8A%C2%A4%C3%AD%C2%81%C2%AC%C3%AB%C2%9F%C2%BC%20%C3%AC%C2%9D%C2%B8%C3%AC%C2%A6%C2%9D%C3%AC%C2%83%C2%B7.png"
        ]
      },
      {
        "_id": "C638LX3Po",
        "name": "김정현",
        "profileImage": []
      },
      {
        "_id": "zNSj7kWAd",
        "name": "조재홍",
        "profileImage": [
          "https://gabang-bucket.s3.ap-northeast-2.amazonaws.com/1657892554817_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%A5%C3%A1%C2%86%C2%BC%C3%A1%C2%84%C2%82%C3%A1%C2%85%C2%A1%C3%A1%C2%86%C2%AB%20%C3%A1%C2%84%C2%80%C3%A1%C2%85%C2%A1%C3%A1%C2%86%C2%BC%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%A1%C3%A1%C2%84%C2%8C%C3%A1%C2%85%C2%B5.jpeg"
        ]
      },
      {
        "_id": "KclrxnAZd",
        "name": "윤익",
        "profileImage": []
      }
    ];

    setSearchUserList(mockData);

  }, []);
  return (
    <Main
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'flex-start'}
      alignItems={'center'}
    >
      <StyledSearchContainer>
        <Input></Input>
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
color: blue;
  &::after{
    content: ${(props) => props.isfollowed ? '"팔로잉 취소"' : '"팔로우"'};
  }
`;

const StyledUserInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledSearchContainer = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

export default SearchPage;
