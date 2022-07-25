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
import * as FeedApi from '@/api/feeds';
import { useSetRecoilState } from 'recoil';
import { Introduction } from '@/components/introduction';

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
    setFeedKindState(FEED_KIND_HOME);
  }, []);

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
          endMessage={<Loading type="end" />}
          loader={feedList.length > 0 && <Loading />}
          scrollableTarget="main-styled"
        >
          {feedList.length > 0 && <Introduction />}
          <div>
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
