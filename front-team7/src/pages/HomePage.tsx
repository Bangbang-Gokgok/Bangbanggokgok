import { Main } from '@/components/Layout';
import styled from 'styled-components';
import FeedDetail from '@/components/Layout/FeedDetail/FeedDetail';
import unknownUser from '@/assets/images/unknown-user.png';
import * as UserApi from '@/api/users';
import { useEffect, useState, CSSProperties } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '@/components/Loading/Loading';
import { FeedListProps, FeedProps } from '@/types/feed';
import * as FeedApi from '@/api/feeds';
import {
  disconnectSocket,
  initSocketConnection,
  sendSocketMessage,
  socketInfoReceived,
} from '@/lib/socket';

const StyledFeedListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
`;

const HomePage = () => {
  const [feedList, setFeedList] = useState<FeedListProps>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [myUserId, setMyUserId] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(3);
  const [totalPage, setTotalPage] = useState<number>(0);

  useEffect(() => {
    get();
    getMyUserId();
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
      index,
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
            {feedList?.map((feed, index) => (
              <FeedDetail
                isModal={false}
                key={`${feed.title}-${index}`}
                currentUserId={myUserId}
                feedList={feed}
                handleFeedLike={() => handleFeedLike(feed, index)}
              ></FeedDetail>
            ))}
          </div>
        </InfiniteScroll>
      </StyledFeedListContainer>
    </Main>
  );
};

export default HomePage;
