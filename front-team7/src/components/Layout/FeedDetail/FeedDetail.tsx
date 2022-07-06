import styled, { css } from 'styled-components';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';

const FeedDetailContainer = styled.div`
  width: 330px;
  height: 280px;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 5px 10px 5px #c2c2c2;
`;
const FeedDetailHeader = styled.div`
  width: 100%;
  height: 32px;
  background-color: #d9d9d9;
  border-radius: 10px 10px 0px 0px;
`;
const FeedDetailBody = styled.div`
  width: 100%;
  height: 250px;
  padding: 8px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const FeedDetailFooter = styled.div`
  width: 100%;
  height: 56px;
  background-color: #d9d9d9;
  border-radius: 0px 0px 10px 10px;
`;
const Title = styled.div`
  width: 100%;
  height: 20px;
  margin-bottom: 8px;
  font-size: 2rem;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
`;
const Description = styled.div`
  width: 100%;
  margin: 8px 0;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 20px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const SlideShow = styled.div`
  width: 100%;
  height: 110px;
  margin: 5px auto;
  position: relative;
  overflow: hidden;
`;

const SlideList = styled.div`
  width: 1000px;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;

const Slide = styled.div<{ data: string }>`
  width: 120px;
  height: 100%;
  float: left;
  border-radius: 20px;
  border: none;
  background-color: ${(props) => props.data};
  margin-right: 15px;
  transition: left 0.5s ease-out;
`;

const Btn = styled.span<{ PrevOrNext: string }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  border-radius: 50%;
  cursor: pointer;

  width: 30px;
  height: 30px;
  line-height: 30px;
  font-weight: 500;
  color: white;
  font-size: 1.5rem;
  border-radius: 50%;
  background-color: gray;
  opacity: 0.6;

  :hover {
    opacity: 1;
  }
  ${(props) => {
    if (props.PrevOrNext === 'prev') {
      return css`
        left: 2%;
      `;
    } else if (props.PrevOrNext === 'next') {
      return css`
        right: 2%;
      `;
    }
  }}
`;

// handleSlider : 이미지 슬라이더 기능 (typescript)
// 참고 : https://eunhee-programming.tistory.com/106
const handleSlider = () => {};

const FeedDetail = () => {
  let colorlist: Array<string> = ['lightgray', '#f5e6bf', '#bfccf5', '#bff5cc'];
  return (
    <FeedDetailContainer>
      <FeedDetailHeader></FeedDetailHeader>
      <FeedDetailBody>
        <Title>👍🏽 홀로 여행기</Title>
        <Description>
          최고의 여행장소! 최고의 데이터 코스! 후회하지 않는 장소로 놀러오세요!
        </Description>
        <SlideShow>
          <SlideList>
            {colorlist.map((color, index) => (
              <Slide key={index} data={color}></Slide>
            ))}
          </SlideList>
          <Btn
            PrevOrNext={'prev'}
            onClick={() => {
              handleSlider;
            }}
          >
            <GrFormPrevious></GrFormPrevious>
          </Btn>
          <Btn
            PrevOrNext={'next'}
            onClick={() => {
              handleSlider;
            }}
          >
            <GrFormNext></GrFormNext>
          </Btn>
        </SlideShow>
      </FeedDetailBody>
      <FeedDetailFooter></FeedDetailFooter>
    </FeedDetailContainer>
  );
};

export default FeedDetail;
