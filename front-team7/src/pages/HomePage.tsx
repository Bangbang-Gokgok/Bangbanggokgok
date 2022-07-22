import { Main } from '@/components/Layout';
import styled from 'styled-components';
// import FeedDetail from '@/components/Layout/FeedDetail/FeedDetail';
import { FeedGrid } from '@/features/feed/components';
import { feedKindState, FEED_KIND_HOME, type FeedsResponse } from '@/store';
import unknownUser from '@/assets/images/unknown-user.png';
import * as UserApi from '@/api/users';
import { useEffect, useState, CSSProperties } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '@/components/Loading/Loading';
import { FeedListProps, FeedProps } from '@/types/feed';
import * as FeedApi from '@/api/feeds';
<<<<<<< HEAD
import { useSetRecoilState } from 'recoil';

import {
  disconnectSocket,
  initSocketConnection,
  sendSocketMessage,
  socketInfoReceived,
} from '@/lib/socket';
=======
import { disconnectSocket, initSocketConnection, sendSocketMessage, socketInfoReceived } from '@/lib/socket';


const StyledFeedListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
`;
>>>>>>> 3ea6173b9a3f1c9362cb8e4950f4b643bd4ae2e0

const HomePage = () => {
  const [feedList, setFeedList] = useState<FeedsResponse[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [myUserId, setMyUserId] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(6);
  const [totalPage, setTotalPage] = useState<number>(0);
  const setFeedKindState = useSetRecoilState(feedKindState);

  useEffect(() => {
    get();
    getMyUserId();
<<<<<<< HEAD
    setFeedKindState(FEED_KIND_HOME);
=======
>>>>>>> 3ea6173b9a3f1c9362cb8e4950f4b643bd4ae2e0
    initSocketConnection();
    socketInfoReceived((users: Object, index: number) => {
      setFeedList((prev) => {
        const newFeed = [...prev];
        newFeed[index].likes = users;
        return newFeed;
      });
    });
    return () => {
      disconnectSocket();
    };
  }, []);

  const handleFeedLike = (currentFeedList: FeedProps, index: number) => {
    sendSocketMessage({
      myUserId,
      feedId: currentFeedList._id,
<<<<<<< HEAD
      index,
=======
      index
>>>>>>> 3ea6173b9a3f1c9362cb8e4950f4b643bd4ae2e0
    });
  };

  async function get() {
    try {
      const result = await FeedApi.getFeedListUsingPagination(page, perPage);
      const initialList = result.feedList;
      const totalPage = result.totalPage;
      setTotalPage(totalPage);
      setPage((page) => page + 1);

      setFeedList(initialList);
    } catch (err) {
      console.log(err);
    }
  }

  async function getMyUserId() {
    try {
      const myInfo = await UserApi.getMyUserInfo();
      setMyUserId(myInfo._id);
    } catch (err) {
      alert('Error 발생! console 확인');
      console.log(err);
    }
  }

  const fetchMoreData = () => {
    if (page > totalPage) {
      setHasMore(false);
      return;
    }

    setTimeout(async () => {
      const newItems = await FeedApi.getFeedListUsingPagination(page, perPage);
      setPage((page) => page + 1);
      setFeedList([...feedList, ...newItems.feedList]);
    }, 1000);
  };

  return (
    <Main
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      padding={'70px 0'}
      id="main-styled"
      bg="#222"
    >
      <StyledFeedListContainer>
        <InfiniteScroll
          style={{ overflow: 'visibility' }}
          dataLength={feedList.length}
          next={fetchMoreData}
          hasMore={hasMore}
          endMessage={<Loading text={'모든 데이터 로드 완료!'}></Loading>}
          loader={<Loading text={'Loading...'}></Loading>}
          scrollableTarget="main-styled"
        >
          <div style={{ minWidth: '850px' }}>
            <FeedGrid feeds={feedList} />
          </div>
        </InfiniteScroll>
      </StyledFeedListContainer>
    </Main>
  );
};

const StyledFeedListContainer = styled.div`
  max-width: 850px;
`;

export default HomePage;
