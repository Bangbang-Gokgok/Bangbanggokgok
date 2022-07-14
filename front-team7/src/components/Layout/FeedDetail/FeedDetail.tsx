import React from 'react';
import styled, { css } from 'styled-components';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { FeedHeader } from '@/components/FeedHeader/FeedHeader';
import { UserInfoProps } from '@/components/UserInfo';

interface FeedDetailContainerProps {
  boxShadow: boolean;
};

interface CenterLatLng {
  lat: number;
  lng: number;
}

const StyledFeedDetailContainer = styled.div<FeedDetailContainerProps>`
  width: 330px;
  height: 280px;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: ${(props) => (props.boxShadow ? '' : '5px 5px 5px #c2c2c2')};
  margin-top: ${(props) => (props.boxShadow ? '' : '30px')};

  @media only screen and (min-width: 768px) {
    width: 450px;
    height: 400px;
  }

  @media only screen and (min-width: 1024px) {
    width: 600px;
    height: 500px;
  }
`;
const StyledFeedDetailHeader = styled.div`
  width: 100%;
  height: 32px;
  background-color: #d9d9d9;
  border-radius: 10px 10px 0px 0px;
`;
const StyledFeedDetailBody = styled.div`
  width: 100%;
  height: 250px;
  padding: 8px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StyledFeedDetailFooter = styled.div`
  width: 100%;
  height: 56px;
  background-color: #d9d9d9;
  border-radius: 0px 0px 10px 10px;
`;
const StyledTitle = styled.div`
  width: 100%;
  height: 20px;
  margin-bottom: 8px;
  font-size: 2rem;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
`;
const StyledDescription = styled.div`
  width: 100%;
  margin: 8px 0;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 20px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StyledSlideShow = styled.div`
  width: 100%;
  height: 110px;
  margin: 5px auto;
  position: relative;
  overflow: hidden;
`;

const StyledSlideList = styled.div`
  width: 1000px;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;

const StyledSlide = styled.div<{ data: string; }>`
  width: 120px;
  height: 100%;
  float: left;
  border-radius: 20px;
  border: none;
  background-color: ${(props) => props.data};
  margin-right: 15px;
  transition: left 0.5s ease-out;
`;

const StyledBtn = styled.span<{ PrevOrNext: string; }>`
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
const handleSlider = () => { };

const FeedDetail = ({
  name,
  image,
  title,
  desc,
  isModal,
  feedId,
  feedUser,
  feedLocation
}: UserInfoProps & { title: string; } & { feedUser?: string; } & { feedLocation?: CenterLatLng; } & { feedId?: string; } & { desc: string; } & { isModal: boolean; }) => {
  let colorlist: Array<string> = ['lightgray', '#f5e6bf', '#bfccf5', '#bff5cc'];

  return (
    <StyledFeedDetailContainer boxShadow={isModal}>
      <FeedHeader feedId={feedId} feedLocation={feedLocation} feedUser={feedUser} isUser={false} isFolded={isModal} name={name} image={image} title={title}></FeedHeader>
      <StyledFeedDetailBody>
        {/* <StyledTitle>👍🏽 {title}</StyledTitle> */}
        <StyledDescription>{desc}</StyledDescription>
        <StyledSlideShow>
          <StyledSlideList>
            {colorlist.map((color, index) => (
              <StyledSlide key={index} data={color}></StyledSlide>
            ))}
          </StyledSlideList>
          <StyledBtn
            PrevOrNext={'prev'}
            onClick={() => {
              handleSlider;
            }}
          >
            <GrFormPrevious></GrFormPrevious>
          </StyledBtn>
          <StyledBtn
            PrevOrNext={'next'}
            onClick={() => {
              handleSlider;
            }}
          >
            <GrFormNext></GrFormNext>
          </StyledBtn>
        </StyledSlideShow>
      </StyledFeedDetailBody>
      <StyledFeedDetailFooter></StyledFeedDetailFooter>
    </StyledFeedDetailContainer>
  );
};

export default FeedDetail;
