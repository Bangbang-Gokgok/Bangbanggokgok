import { Main } from '@/components/Layout';
import styled from 'styled-components';
import FeedDetail from '@/components/Layout/FeedDetail/FeedDetail';
import unknownUser from '@/assets/images/unknown-user.png';
import * as Api from '@/api/feeds';
import * as UserApi from '@/api/users';
// import { UserInfoProps } from '@/components/UserInfo';
import { useEffect, useState, CSSProperties } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '@/components/Loading/Loading';

const StyledFeedListContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 0;

  // .grid-group {
  //   display: grid;
  //   grid-template-columns: 1fr;
  //   row-gap: 30px;
  //   // column-gap: 30px;
  //   @media only screen and (min-width: 1024px) {
  //     // display: grid;
  //     grid-template-columns: repeat(2, 1fr);
  //     row-gap: 30px;
  //     column-gap: 30px;
  //   }

  //   .grid-item {
  //     margin-bottom: 30px;
  //   }
  // }
`;

interface CenterLatLng {
  lat: number;
  lng: number;
}

interface FeedProps {
  _id: string;
  userName: string;
  userId: string;
  title: string;
  imageUrl: Array<string>;
  description: string;
  address: string;
  location: CenterLatLng;
  createdAt: string;
}

interface FeedListProps extends Array<FeedProps> { }

// 추후에 feed의 get을 pagination 처리로 몇개씩만 가져올 수 있게끔 구현되면
// 그떄는 MOCK_ITEMS 없애고, fetchMoreData에서 가져오는 부분 (axios.get) 구현하기

const MOCK_ITEMS: FeedListProps = [
  { userName: '김지환', title: '👍🏽 홀로 여행기1', description: '설명!' },
  { userName: '김지환', title: '👍🏽 홀로 여행기2', description: '설명!' },
  { userName: '김지환', title: '👍🏽 홀로 여행기3', description: '설명!' },
];

const HomePage = () => {
  // let name = '김지환';
  // let title = '👍🏽 홀로 여행기';
  const [feedList, setFeedList] = useState<FeedListProps>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [myUserId, setMyUserId] = useState<string>();

  const fetchMoreData = () => {
    console.log('feedList.length : ', feedList.length);
    if (feedList.length >= 10) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      const newItems = feedList.concat(MOCK_ITEMS);
      setFeedList(newItems);
    }, 1000);
  };

  // const sendData = {
  //   userName: '김지환',
  //   title: '신기한 POST의 세계',
  //   description: '저는 지금 POST를 구현중입니다.',
  //   address: '서울시 광진구',
  //   location: {
  //     lat: 1,
  //     lng: 2,
  //   },
  // };

  // const updateFeedID = '62cbc5aacc2e9840852d11bf';
  // const updateData = {
  //   userName: '수정된 김지환',
  //   title: '수정된 PUT의 세계',
  //   description: '저는 지금 PUT를 구현중입니다.',
  //   address: '서울시 수정구 수정동',
  //   location: {
  //     lat: 11111,
  //     lng: 22222,
  //   },
  // };

  // delete 구현 (onClick 이벤트)
  // async function del() {
  //   if (confirm('삭제하시겠습니까?')) {
  //     // const deleteFeedID = '62cbc449cc2e9840852d11b1';
  //     const result: FeedListProps = await Api.deleteOneFeed(deleteFeedID);
  //     console.log('delete() : ', result);
  //   }
  // }

  useEffect(() => {
    async function get() {
      const result: FeedListProps = await Api.getAllFeeds();
      setFeedList(result);
    }

    async function getMyUserId() {
      const myInfo = await UserApi.getMyUserInfo();
      setMyUserId(myInfo._id);
      console.log('myUserId : ', myUserId);
    }
    // create 구현
    // async function create() {
    //   console.log('sendData : ', sendData);
    //   const result: FeedListProps = await Api.createOneFeeds(sendData);
    //   console.log('create() : ', result);
    // }
    // create();

    // update 구현
    // async function update() {
    //   console.log('updateData : ', updateData);
    //   const result: FeedListProps = await Api.updateOneFeed(updateFeedID, updateData);
    //   console.log('update() : ', result);
    // }

    // update();
    get();
    getMyUserId();
  }, []);
  return (
    <Main
      id="main-styled"
      display={'flex'}
      flexDirection={'column'}
      // justifyContent={'flex-start'}
      alignItems={'center'}
      padding={'70px 0'}
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
            {feedList?.map((feed, index) => (
              <FeedDetail
                isModal={false}
                key={`${feed.title}-${index}`}
                name={feed.userName}
                userId={myUserId}
                feedId={feed._id}
                feedLocation={feed.location}
                feedUser={feed.userId}
                feedImg={feed.imageUrl}
                image={unknownUser as string}
                title={feed.title}
                desc={feed.description}
              ></FeedDetail>
            ))}
          </div>
        </InfiniteScroll>
      </StyledFeedListContainer>
    </Main>
  );
};

export default HomePage;
