import styled from 'styled-components';
import { Main } from '@/components/Layout';
import { UserInfo } from '@/components/UserInfo';
import Input from '@/components/Input/Input';
import unknownUser from '@/assets/images/unknown-user.png';
import React, { useEffect, useState } from 'react';
import { axios } from '@/lib';
import { userFieldQuery } from '@/store';
import { useRecoilValue } from 'recoil';

interface userData {
  _id: string,
  name: string,
  profileImage: Array<string>;
  friends: friendList;
}

type friendList = Array<string>;

type userDataList = Array<userData>;

const SearchPage = () => {
  const [currentUsersFriends, setCurrentUsersFriends] = useState<friendList>([]);
  const [searchUserList, setSearchUserList] = useState<userDataList>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const userIdAtom = useRecoilValue(userFieldQuery('id'));

  useEffect(() => {
    getCurrentUsersFriends();
  }, []);

  const getCurrentUsersFriends = async () => {
    try {
      const result = await axios.get<never, friendList>('api/users/friends');
      setCurrentUsersFriends(result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const onClickSearch = () => {
    searchUser(searchKeyword);
  };

  const onClickFollow = async (selectedUserId: string) => {
    try {
      const result = await axios.put(`api/users/friends/${selectedUserId}`);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const searchUser = async (keyword: string) => {
    const validatedKeyword = keyword.trim();
    try {
      const result = await axios.get<never, userDataList>(`/api/users/list?keyword=${validatedKeyword}`);
      console.log(currentUsersFriends);

      const validatedResult = result.filter(value => (value._id !== userIdAtom)); // 나를 제외한 결과

      const aa = result.filter(value => value.friends); // 상대방 친구 목록에 내가 있는지 (맞팔로우)

      console.log(validatedResult);

      setSearchUserList(validatedResult);
    } catch (err) {
      console.log(err);
    }
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
          onClickSearch={() => onClickSearch()}
        />
        {searchUserList.length > 0
          ?
          searchUserList.map((user, idx) => (
            <StyledUserInfoWrapper key={idx}>
              <UserInfo name={user.name} image={user.profileImage[0] || unknownUser as string}></UserInfo>
              <StyledFollowButton onClick={() => onClickFollow(user._id)} isfollowed={false} />
            </StyledUserInfoWrapper>
          ))
          :
          <StyledNoSearchResult />
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
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  gap: 25px;
`;

const StyledNoSearchResult = styled.div`
  font-size: 2rem;
  &::after{
    content: '검색 결과가 없습니다.'
  }
`;

export default SearchPage;
