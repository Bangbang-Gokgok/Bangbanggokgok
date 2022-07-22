import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import CommentComponent from '@/components/CommentComponent/CommentComponent';
import { FeedProps, ReviewListProps } from '@/types/feed';
import { UserInfoProps } from '@/components/UserInfo';
import { FeedHeader } from '@/components/FeedHeader/FeedHeader';
import * as ReviewApi from '@/api/review';
import Carousel from 'react-material-ui-carousel';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { RiHeart3Fill, RiHeart3Line } from 'react-icons/ri';

interface FeedDetailContainerProps {
  boxShadow: boolean;
  // dropDownVisible: boolean;
}

const FeedDetail = ({
  isModal,
  currentUserId,
  image,
  feedList,
  handleFeedLike,
}: { image?: string } & { currentUserId: string } & { isModal: boolean } & {
  feedList: FeedProps;
} & { handleFeedLike: () => void }) => {
  const [reviewList, setReviewList] = useState<ReviewListProps>();
  const [dropDownVisible, setDropDownVisible] = useState<boolean>(false);

  async function get() {
    // 해당 Feed 에 있는 Review들만 가져오기
    try {
      const getReviewByFeedID: ReviewListProps = await ReviewApi.getReviewsByFeedID(feedList._id);

      setReviewList(getReviewByFeedID);
    } catch (err) {
      alert('Error 발생 ');
      console.log(err);
    }
  }

  useEffect(() => {
    get();
  }, []);

  const toggleDropDownVisible = () => {
    setDropDownVisible((prev) => !prev);
  };

  return (
    <StyledFeedDetailContainer boxShadow={isModal}>
      <FeedHeader
        feedLocation={feedList.location}
        feedUserId={feedList.userId}
        isUser={false}
        isFolded={isModal}
        name={feedList.userName}
        image={image}
        title={feedList.title}
      ></FeedHeader>
      <StyledFeedDetailBody>
        {/* <StyledTitle>👍🏽 {title}</StyledTitle> */}
        <StyledFeedDetailDescription>{feedList.description}</StyledFeedDetailDescription>
        {feedList.imageUrl.length > 0 && (
          <StyledFeedDetailImage>
            <StyledFeedDetailSlide>
              {feedList.imageUrl.length === 1 ? (
                <StyledSlide src={feedList.imageUrl[0]} />
              ) : (
                <Carousel className={'carousel'} indicators={false} navButtonsAlwaysVisible={true}>
                  {feedList.imageUrl?.map((item, index) => (
                    <StyledSlide key={index} src={item}></StyledSlide>
                  ))}
                </Carousel>
              )}
            </StyledFeedDetailSlide>
          </StyledFeedDetailImage>
        )}
        <StyledFeedDetailInfo>
          <StyledLikeWrapper>
            <StyledLikeButton onClick={handleFeedLike}>
              {feedList.likes.hasOwnProperty(currentUserId) ? <RiHeart3Fill /> : <RiHeart3Line />}
            </StyledLikeButton>
            <span>{Object.keys(feedList.likes).length} like</span>
          </StyledLikeWrapper>

          <div>
            {reviewList?.length}개의 댓글
            {dropDownVisible ? (
              <MdArrowDropUp
                className="dropBtn"
                onClick={() => {
                  toggleDropDownVisible();
                }}
              ></MdArrowDropUp>
            ) : (
              <MdArrowDropDown
                className="dropBtn"
                onClick={() => {
                  toggleDropDownVisible();
                }}
              ></MdArrowDropDown>
            )}
          </div>
        </StyledFeedDetailInfo>
      </StyledFeedDetailBody>
      {dropDownVisible ? (
        <StyledFeedDetailReview>
          <CommentComponent
            reviewList={reviewList}
            currentFeedList={feedList}
            get={get}
            currentUserId={currentUserId}
          ></CommentComponent>
        </StyledFeedDetailReview>
      ) : (
        <></>
      )}
    </StyledFeedDetailContainer>
  );
};

const StyledFeedDetailContainer = styled.div<FeedDetailContainerProps>`
  width: 330px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: ${(props) => (props.boxShadow ? '' : '5px 5px 10px 2px #c2c2c2')};

  @media only screen and (min-width: 768px) {
    width: 450px;
  }

  @media only screen and (min-width: 1024px) {
    width: 500px;
  }
`;
const StyledFeedDetailBody = styled.div`
  box-sizing: border-box;
  z-index: 2;
  background-color: #ffffff;
  margin-top: 10px;
  border-radius: 15px;
  gap: 10px;
`;

const StyledFeedDetailImage = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledFeedDetailDescription = styled.div`
  width: 100%;
  min-height: 40px;
  padding: 0 20px;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StyledFeedDetailSlide = styled.div`
  width: 100%;
  min-height: 200px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .carousel {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: black;
  }
`;

const StyledSlide = styled.img<{ src: string }>`
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  background-image: url(${(props) => props.src});
`;

const StyledFeedDetailInfo = styled.div`
  width: 100%;
  min-height: 40px;
  line-height: 40px;
  padding: 0 10px;
  font-size: 1.3rem;
  display: flex;
  justify-content: space-between;
  .dropBtn {
    font-size: 2.2rem;
    cursor: pointer;
  }
`;

const StyledLikeButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 2.2rem;
  cursor: pointer;
`;

const dropAnimation = keyframes`
0% {
  height : 0;
  display : none;
}
100% {
  height : 250px;
  background-color: #a2c4f3;
}
`;
const StyledFeedDetailReview = styled.div`
  margin: 0 10px 10px 10px;
  padding: 10px;
  background-color: #a2c4f3;
  border-radius: 10px;
  z-index: 1;
  animation: ${dropAnimation} 0.4s alternate;
`;

const StyledLikeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

export default FeedDetail;
