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
  const [followerList, setFollowerList] = useState<userDataList>([]);
  const [notAFollowerList, setNotAFollowerList] = useState<userDataList>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchState, setSearchState] = useState(false);
  const userIdAtom = useRecoilValue(userFieldQuery('id'));

  useEffect(() => {
    getCurrentUsersFriends();
  }, [followerList, notAFollowerList]);

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

  const onKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      onClickSearch();
    }
  };

  const onClickSearch = () => {
    searchUser(searchKeyword);
  };

  const onClickFollow = async (e: React.MouseEvent<HTMLButtonElement>, selectedUser: userData) => {
    const target = e.target as HTMLButtonElement;

    try {
      await axios.put(`api/users/friends/${selectedUser._id}`);
      renderNewResult(target.name, selectedUser);
    } catch (err) {
      console.log(err);
    }
  };

  const renderNewResult = (target: string, user: userData) => {
    if (target === 'follow') {
      setNotAFollowerList((prev) => {
        return prev.filter(item => item._id !== user._id);
      });
      setFollowerList((prev) => {
        return [...prev, user];
      });
    } else if (target === 'unFollow') {
      setNotAFollowerList((prev) => {
        return [...prev, user];
      });
      setFollowerList((prev) => {
        return prev.filter(item => item._id !== user._id);
      });
    }
  };

  const searchUser = async (keyword: string) => {
    const validatedKeyword = keyword.trim();
    try {
      const result = await axios.get<never, userDataList>(`/api/users/list?keyword=${validatedKeyword}`);

      const validatedResult = result.filter(value => (value._id !== userIdAtom));
      const myFollowerList = validatedResult.filter(friend => currentUsersFriends.hasOwnProperty(friend._id));
      const notMyFollowerList = validatedResult.filter(friend => !currentUsersFriends.hasOwnProperty(friend._id));

      setFollowerList(myFollowerList);
      setNotAFollowerList(notMyFollowerList);
      setSearchState(true);
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
          onKeyPressSearch={onKeyPress}
          handleInput={(e) => handleInput(e)}
          onClickSearch={() => onClickSearch()}
        />
<<<<<<< HEAD
        {(followerList.length > 0 && notAFollowerList.length > 0) ? <>
=======
        {(followerList.length > 0 || notAFollowerList.length > 0) ? <>
>>>>>>> 3ea6173b9a3f1c9362cb8e4950f4b643bd4ae2e0
          {
            followerList.length > 0
            &&
            <StyledFollowerListContainer>
              <StyledListHeader>
                <span>내 팔로잉</span>
              </StyledListHeader>
              <StyledFollowerList>
                {followerList.map((user, idx) => (
                  <StyledUserInfoWrapper key={idx}>
                    <UserInfo name={user.name} userId={user._id} image={user.profileImage[0] || unknownUser as string}></UserInfo>
                    <StyledFollowButton name='unFollow' onClick={(e) => onClickFollow(e, user)} isfollowed={true} />
                  </StyledUserInfoWrapper>
                ))}
              </StyledFollowerList>
            </StyledFollowerListContainer>
          }
          {notAFollowerList.length > 0
            &&
            <StyledNotFollowerListContainer>
              <StyledListHeader>
                <span>검색 결과</span>
              </StyledListHeader>
              <StyledNotFollowerList>
                {notAFollowerList.map((user, idx) => (
                  <StyledUserInfoWrapper key={idx}>
                    <UserInfo name={user.name} userId={user._id} image={user.profileImage[0] || unknownUser as string}></UserInfo>
                    <StyledFollowButton name='follow' onClick={(e) => onClickFollow(e, user)} isfollowed={false} />
                  </StyledUserInfoWrapper>
                ))}
              </StyledNotFollowerList>
            </StyledNotFollowerListContainer>
          }
        </>
          : <StyledNoSearchResult />}
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
  width: 330px;
  height: 100%;
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;

  @media only screen and (min-width: 768px) {
    width: 450px;
  }

  @media only screen and (min-width: 1024px) {
    width: 500px;
  }
`;

const StyledNoSearchResult = styled.div`
  font-size: 2rem;
  &::after{
    content: '검색 결과가 없습니다.'
  }

  @media only screen and (min-width: 768px) {
    font-size: 2.2rem;
  }

  @media only screen and (min-width: 1024px) {
    font-size: 2.5rem;
  }
`;

const StyledFollowerListContainer = styled.div`
  width: 100%;
  max-height: 25%;
  overflow-y: auto;
  border-bottom: 1px solid rgb(219, 219, 219);
`;

const StyledNotFollowerListContainer = styled(StyledFollowerListContainer)`
  width: 100%;
  max-height: 75%;
  height: 75%;
  border: none;
`;

const StyledFollowerList = styled.div`
  padding: 5px 5px 20px 5px;
  gap: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

const StyledNotFollowerList = styled(StyledFollowerList)`
  padding: 5px;
`;

const StyledListHeader = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  left: 0;
  transform: translateY(-10%);
  width: 100%;
  align-items: center;
  justify-content: left;
  background-color: white;
  font-size: 1.5rem;
  font-weight: 600;
`;

export default SearchPage;
