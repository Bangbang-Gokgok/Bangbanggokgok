import { Main } from '@/components/Layout';
import styled from 'styled-components';
import FeedDetail from '@/components/Layout/FeedDetail/FeedDetail';
import unknownUser from '@/assets/images/unknown-user.png';
const StyledFeedListContainer = styled.div`
  width: 330px;
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-itmes: center;

  padding: 30px 0;
  gap: 30px;
`;

const Home = () => {
  let name = '김지환';
  let title = '👍🏽 홀로 여행기';

  return (
    <Main
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'flex-start'}
      alignItems={'center'}
    >
      <StyledFeedListContainer>
        <FeedDetail name={name} image={unknownUser as string} title={title}></FeedDetail>
        <FeedDetail name={name} image={unknownUser as string} title={title}></FeedDetail>
        <FeedDetail name={name} image={unknownUser as string} title={title}></FeedDetail>
        <FeedDetail name={name} image={unknownUser as string} title={title}></FeedDetail>
      </StyledFeedListContainer>
    </Main>
  );
};

export default Home;
