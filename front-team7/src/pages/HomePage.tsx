import { Main } from '@/components/Layout';
import styled from 'styled-components';
import FeedDetail from '@/components/Layout/FeedDetail/FeedDetail';
import unknownUser from '@/assets/images/unknown-user.png';
import * as Api from '@/api/feeds';
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
  useEffect(() => {
    async function get() {
      const result: FeedListProps = await Api.getAllFeeds();
      setFeedList(result);
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
