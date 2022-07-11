import { Main } from '@/components/Layout';
import styled from 'styled-components';
import FeedDetail from '@/components/Layout/FeedDetail/FeedDetail';
import unknownUser from '@/assets/images/unknown-user.png';
import { getAllFeeds, getOneFeeds } from '@/api/feeds';
import { UserInfoProps } from '@/components/UserInfo';
import { useEffect, useState } from 'react';

const StyledFeedListContainer = styled.div`
  width: 330px;
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-itmes: center;

  padding: 30px 0;
  gap: 30px;
`;

interface CenterLatLng {
  lat: number;
  lng: number;
}

interface FeedProps {
  username: string;
  title: string;
  description: string;
  address: string;
  location: CenterLatLng;
  createAt: string;
}

interface FeedListProps extends Array<FeedProps> {}

const HomePage = () => {
  // let name = '김지환';
  // let title = '👍🏽 홀로 여행기';

  const [feedList, setFeedList] = useState<FeedListProps>();

  useEffect(() => {
    async function get() {
      const result: FeedListProps = await getAllFeeds();
      setFeedList(result);
    }
    get();
  }, []);
  return (
    <Main
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'flex-start'}
      alignItems={'center'}
    >
      <StyledFeedListContainer>
        {feedList?.map((feed, index) => (
          <FeedDetail
            key={`${feed.title}-${index}`}
            name={feed.username}
            image={unknownUser as string}
            title={feed.title}
            desc={feed.description}
          ></FeedDetail>
        ))}
      </StyledFeedListContainer>
    </Main>
  );
};

export default HomePage;
