import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import CommentComponent from '@/components/CommentComponent/CommentComponent';
import { FeedProps, ReviewListProps } from '@/types/feed';
import { UserInfoProps } from '@/components/UserInfo';
import { FeedHeader } from '@/components/FeedHeader/FeedHeader';
import * as ReviewApi from '@/api/review';
import Carousel from 'react-material-ui-carousel';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5030/', {
  autoConnect: true,
  transports: ['websocket'],
});

interface FeedDetailContainerProps {
  boxShadow: boolean;
  // dropDownVisible: boolean;
}

const FeedDetail = ({
  isModal,
  currentUserId,
  image,
  feedList,
}: UserInfoProps & { currentUserId: string; } & { isModal: boolean; } & { feedList: FeedProps; }) => {
  const [reviewList, setReviewList] = useState<ReviewListProps>();
  const [dropDownVisible, setDropDownVisible] = useState<boolean>(false);
  const [currentFeedList, setCurrentFeedList] = useState<FeedProps>(feedList);
  const [likesState, setLikesState] = useState(Object.keys(currentFeedList.likes).length);

  async function get() {
    // 해당 Feed 에 있는 Review들만 가져오기
    try {
      const getReviewByFeedID: ReviewListProps = await ReviewApi.getReviewsByFeedID(
        currentFeedList._id
      );
      socket.emit('likeListRequest', currentFeedList._id);
      socket.on('likeListResponse', (likes) => {
        setCurrentFeedList((prev) => ({
          ...prev,
          likes,
        }));
      });
      setReviewList(getReviewByFeedID);
    } catch (err) {
      alert('Error 발생 ');
      console.log(err);
    }
  }

  useEffect(() => {
    get();
    socket.on('likeResponse', (users) => {
      setLikesState(Object.keys(users).length);
    });
  }, []);

  const toggleDropDownVisible = () => {
    setDropDownVisible((prev) => !prev);
  };

  const LikeFeed = () => {
    socket.emit('likeRequest', currentUserId, currentFeedList._id);
  };

  return (
    <StyledFeedDetailContainer boxShadow={isModal}>
      <FeedHeader
        feedLocation={currentFeedList.location}
        feedUser={currentFeedList.userId}
        isUser={false}
        isFolded={isModal}
        name={currentFeedList.userName}
        image={image}
        title={currentFeedList.title}
      ></FeedHeader>
      <StyledFeedDetailBody>
        {/* <StyledTitle>👍🏽 {title}</StyledTitle> */}
        <StyledFeedDetailDescription>{currentFeedList.description}</StyledFeedDetailDescription>
        {feedList.imageUrl.length > 0 &&
          <StyledFeedDetailImage>
            <StyledFeedDetailSlide>
              {feedList.imageUrl.length === 1 ?
                <StyledSlide src={currentFeedList.imageUrl[0]} />
                :
                <Carousel
                  className={'carousel'}
                  indicators={false}
                  navButtonsAlwaysVisible={true}
                >
                  {currentFeedList.imageUrl?.map((item, index) => (
                    <StyledSlide key={index} src={item}></StyledSlide>
                  ))}
                </Carousel>}

            </StyledFeedDetailSlide>
          </StyledFeedDetailImage>}
        <StyledFeedDetailInfo>
          <StyledLikeWrapper>
            <StyledLikeButton onClick={LikeFeed}>{
              <AiOutlineHeart />//<AiFillHeart />
            }</StyledLikeButton>
            <span>{likesState} like</span>
          </StyledLikeWrapper>

          <div>
            {reviewList?.length}개의 댓글
            {!!reviewList?.length && <>
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
            </>}
          </div>
        </StyledFeedDetailInfo>
      </StyledFeedDetailBody>
      {dropDownVisible ? (
        <StyledFeedDetailReview>
          <CommentComponent
            reviewList={reviewList}
            currentFeedList={currentFeedList}
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
  gap: 10px;
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


const StyledSlide = styled.img<{ src: string; }>`
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
`;

const dropAnimation = keyframes`
0% {
  transform : translateY(-300px);
  display : none;
}
100% {
  transform : translateY(0);
}
`;
const StyledFeedDetailReview = styled.div`
  height: 250px;
  margin: 10px;
  padding: 10px;
  background-color: #a2c4f3;
  border-radius: 10px;
  z-index: 1;
  animation: ${dropAnimation} 1s alternate;
`;

const StyledLikeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

export default FeedDetail;
