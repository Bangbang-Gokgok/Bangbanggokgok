import { Main } from '@/components/Layout';
import FeedDetail from '@/components/Layout/FeedDetail/FeedDetail';
import unknownUser from '@/assets/images/unknown-user.png';

const Home = () => {
  let name = '김지환';
  let title = '👍🏽 홀로 여행기';

  // const mainStyle = {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   padding: '40px 0',
  //   gap: '40px',
  // };

  return (
    <Main
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'flex-start'}
      alignItems={'center'}
      padding={'40px 0'}
      gap={'40px'}
    >
      <FeedDetail name={name} image={unknownUser as string} title={title}></FeedDetail>
      <FeedDetail name={name} image={unknownUser as string} title={title}></FeedDetail>
      <FeedDetail name={name} image={unknownUser as string} title={title}></FeedDetail>
      <FeedDetail name={name} image={unknownUser as string} title={title}></FeedDetail>
    </Main>
  );
};

export default Home;
