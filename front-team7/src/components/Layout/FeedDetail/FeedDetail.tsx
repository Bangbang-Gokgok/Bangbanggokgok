import styled from 'styled-components';
import Carousel from 'react-material-ui-carousel';
import { color } from '@mui/system';

//px 단위 전부 rem 으로 바꾸기

const FeedDetailContainer = styled.div`
  width: 322px;
  height: 280px;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 5px 10px 5px #c2c2c2;
`;
const FeedDetailHeader = styled.div`
  width: 322px;
  height: 32px;
  background-color: #d9d9d9;
  border-radius: 10px 10px 0px 0px;
`;
const FeedDetailBody = styled.div`
  width: 322px;
  height: 250px;
  padding: 8px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;
const FeedDetailFooter = styled.div`
  width: 322px;
  height: 56px;
  background-color: #d9d9d9;
  border-radius: 0px 0px 10px 10px;
`;
const Title = styled.div`
  width: 322px;
  height: 20px;
  font-size: 20px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
`;
const Description = styled.div`
  width: 322px;
  margin: 8px 0;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ImageList = styled.div`
  height: 140px;
  background-color: white;
`;

const Image = styled.img`
  width: 180px;
  height: 120px;
  margin: 10px 63px;
  border-radius: 20px;
  border: none;
  background-color: ${(props) => props.color};
`;

const FeedDetail = () => {
  let colorlist: Array<String> = ['lightgray', '#f5e6bf', '#bfccf5', '#bff5cc'];

  return (
    <FeedDetailContainer>
      <FeedDetailHeader></FeedDetailHeader>
      <FeedDetailBody>
        <Title>👍🏽 홀로 여행기</Title>
        <Description>
          최고의 여행장소! 최고의 데이터 코스! 후회하지 않는 장소!ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄹ
        </Description>
        <ImageList>
          <Carousel
            autoPlay={false}
            animation={'slide'}
            navButtonsAlwaysVisible={true}
            indicators={false}
            navButtonsProps={{
              style: {
                backgroundColor: '#D9D9D9',
                color: 'black',
                opacity: 0.6,
              },
            }}
          >
            {colorlist.map((color, i) => (
              <Image key={i} color={color} />
            ))}
          </Carousel>
        </ImageList>
      </FeedDetailBody>
      <FeedDetailFooter></FeedDetailFooter>
    </FeedDetailContainer>
  );
};

export default FeedDetail;
