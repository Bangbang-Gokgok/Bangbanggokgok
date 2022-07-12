import { useState } from 'react';
import { Main } from '@/components/Layout';
import styled from 'styled-components';
import FeedDetail from '@/components/Layout/FeedDetail/FeedDetail';
import unknownUser from '@/assets/images/unknown-user.png';
import InfiniteScroll from 'react-infinite-scroll-component';
// import { useEffect } from '@storybook/addons';

const FeedListContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  // padding: 30px 0;
  // gap: 30px;
`;

interface MOCK {
  name: string;
  title: string;
}
const MOCK_ITEMS: MOCK[] = [
  { name: '김지환', title: '👍🏽 홀로 여행기1' },
  { name: '김지환', title: '👍🏽 홀로 여행기2' },
  { name: '김지환', title: '👍🏽 홀로 여행기3' },
];

const InfiniteScrollHomePage = () => {
  // let name = '김지환';
  // let title = '👍🏽 홀로 여행기';

  const [items, setItems] = useState<MOCK[]>(MOCK_ITEMS);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchMoreData = () => {
    if (items.length >= 9) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      const newItems = items.concat(MOCK_ITEMS);
      setItems(newItems);
    }, 1000);
  };

  return (
    <Main
      id="main-styled"
      display={'flex'}
      flexDirection={'column'}
      // justifyContent={'flex-start'}
      alignItems={'center'}
      padding={'70px 0'}
      // 임의로 준 높이값. 위로 스크롤 잘 안됨 + 다른 크기의 창에서는 또 위아래가 잘려서 보임...
      height={'800px'}
    >
      <FeedListContainer>
        <div style={{ width: '90%' }}>
          <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={hasMore}
            endMessage={<h4>모든 데이터 로드 완료!</h4>}
            loader={<h4>Loading...</h4>}
            scrollableTarget="main-styled"
          >
            {items.map((item, index) => (
              <FeedDetail
                key={index}
                name={item.name}
                image={unknownUser as string}
                title={item.title}
                desc={'description'}
              ></FeedDetail>
            ))}
          </InfiniteScroll>
        </div>
      </FeedListContainer>
    </Main>
  );
};

export default InfiniteScrollHomePage;
