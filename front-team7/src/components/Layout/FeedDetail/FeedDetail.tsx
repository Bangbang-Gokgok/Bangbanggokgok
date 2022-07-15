import React from 'react';
import styled, { css } from 'styled-components';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { FeedHeader } from '@/components/FeedHeader/FeedHeader';
import { UserInfoProps } from '@/components/UserInfo';
import Carousel from 'react-material-ui-carousel';

interface FeedDetailContainerProps {
  boxShadow: boolean;
}

interface CenterLatLng {
  lat: number;
  lng: number;
}

const StyledFeedDetailContainer = styled.div<FeedDetailContainerProps>`
  width: 330px;
  // height: 280px;
  background-color: white;
  display: flex;
  // position: absolute;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: ${(props) => (props.boxShadow ? '' : '5px 5px 5px #c2c2c2')};
  margin-top: ${(props) => (props.boxShadow ? '' : '30px')};

  @media only screen and (min-width: 768px) {
    width: 450px;
    // height: 400px;
  }

  @media only screen and (min-width: 1024px) {
    width: 600px;
    // height: 500px;
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
  height: 400px;
  position: relative;
  padding: 8px;
  // background-color: yellow;
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

const StyledFeedDetailDescription = styled.div`
  width: 100%;

  // position: relative;
  background-color: red;
  margin: 8px 0;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 20px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StyledFeedDetailSlide = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: green;

  display: flex;
  justify-content: center;
  align-items: center;

  .carousel {
    width: 100%;
    height: 100%;
    position: relative;
    height: 300px;
    background-color: black;
  }
`;

// const StyledSlide = styled.img<{ src: string }>`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   background-color: yellow;
// `;

const StyledSlide = styled.div<{ src: string }>`
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: cover;
  background-image: url(${(props) => props.src});
`;

const StyledFeedDetailInfo = styled.div`
  width: 100%;
  padding: 10px 0 5px 0;
  display: flex;
  justify-content: space-between;
`;

const FeedDetail = ({
  name,
  image,
  title,
  desc,
  isModal,
  feedId,
  feedUser,
  feedImg,
  feedLocation,
}: UserInfoProps & { title: string } & { feedImg?: Array<string> } & { feedUser?: string } & {
  feedLocation?: CenterLatLng;
} & { feedId?: string } & { desc: string } & { isModal: boolean }) => {
  return (
    <StyledFeedDetailContainer boxShadow={isModal}>
      <FeedHeader
        feedId={feedId}
        feedLocation={feedLocation}
        feedUser={feedUser}
        isUser={false}
        isFolded={isModal}
        name={name}
        image={image}
        title={title}
      ></FeedHeader>
      <StyledFeedDetailBody>
        {/* <StyledTitle>👍🏽 {title}</StyledTitle> */}
        <StyledFeedDetailDescription>{desc}</StyledFeedDetailDescription>
        <StyledFeedDetailSlide>
          <Carousel className={'carousel'} indicators={false} navButtonsAlwaysVisible={true}>
            {feedImg?.map((item, index) => (
              <StyledSlide key={index} src={item}></StyledSlide>
            ))}
          </Carousel>
        </StyledFeedDetailSlide>
        <StyledFeedDetailInfo>
          <div>Like 10개</div>
          <div>댓글 10개</div>
        </StyledFeedDetailInfo>
      </StyledFeedDetailBody>
      <StyledFeedDetailFooter></StyledFeedDetailFooter>
    </StyledFeedDetailContainer>
  );
};

export default FeedDetail;
