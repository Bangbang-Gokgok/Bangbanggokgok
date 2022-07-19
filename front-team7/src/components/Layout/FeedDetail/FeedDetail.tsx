import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import CommentComponent from '@/components/CommentComponent/CommentComponent';
import { FeedProps, ReviewListProps } from '@/types/feed';
import { UserInfoProps } from '@/components/UserInfo';
import { FeedHeader } from '@/components/FeedHeader/FeedHeader';
import * as ReviewApi from '@/api/review';
import Carousel from 'react-material-ui-carousel';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
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

  const [likesState, setLikesState] = useState(currentFeedList.likes.length);

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
      setLikesState(users.length);
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
        <StyledFeedDetailSlide>
          <Carousel className={'carousel'} indicators={false} navButtonsAlwaysVisible={true}>
            {currentFeedList.imageUrl?.map((item, index) => (
              <StyledSlide key={index} src={item}></StyledSlide>
            ))}
          </Carousel>
        </StyledFeedDetailSlide>
        <StyledFeedDetailInfo>
          <div>
            <button onClick={LikeFeed}>Like</button>
            <span> {likesState}개</span>
          </div>

          <div>
            댓글 {reviewList?.length}개
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
  // height: ${(props) => (props.dropDownVisible ? '780px' : '480px')};
  // background-color: blue;
  display: flex;
  // position: absolute;
  flex-direction: column;
  border-radius: 10px;
  gap: 10px;
  box-shadow: ${(props) => (props.boxShadow ? '' : '0 0 10px 5px #c2c2c2')};
  // margin-top: ${(props) => (props.boxShadow ? '' : '30px')};

  @media only screen and (min-width: 768px) {
    width: 450px;
  }

  @media only screen and (min-width: 1024px) {
    width: 500px;
  }
`;
const StyledFeedDetailHeader = styled.div`
  width: 100%;
  height: 32px;
  background-color: #d9d9d9;
  border-radius: 10px 10px 0px 0px;
`;
const StyledFeedDetailBody = styled.div`
  // width: 90%;
  height: 320px;
  position: relative;
  box-sizing: border-box;
  z-index: 2;
  padding: 10px;
  border-radius: 15px;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const StyledFeedDetailDescription = styled.div`
  width: 100%;
  min-height: 40px;
  // position: relative;
  // background-color: red;

  padding: 0 10px;
  font-size: 2rem;
  font-weight: 600;
  line-height: 40px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StyledFeedDetailSlide = styled.div`
  width: 100%;
  min-height: 200px;
  position: relative;
  background-color: green;

  display: flex;
  justify-content: center;
  align-items: center;

  .carousel {
    width: 100%;
    height: 100%;
    position: relative;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    background-color: black;
  }
`;

// const StyledSlide = styled.img<{ src: string }>`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   background-color: yellow;
// `;

const StyledSlide = styled.div<{ src: string; }>`
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: cover;
  background-image: url(${(props) => props.src});
`;

const StyledFeedDetailInfo = styled.div`
  width: 100%;
  min-height: 40px;
  line-height: 40px;
  // background-color: whitesmoke;
  padding: 0 10px;
  font-size: 1.5rem;
  display: flex;
  justify-content: space-between;
  // margin-bottom: 10px;
  .dropBtn {
    font-size: 2.5rem;
    cursor: pointer;
  }
`;

const dropAnimation = keyframes`
0% {
  transform : translateY(-300px);
  display : none;
}
100% {
  transform : translateY(0);
  // display : block;
}
`;
const StyledFeedDetailReview = styled.div`
  // width: 100%;
  height: 250px;
  margin: 10px;
  padding: 10px;
  background-color: #a2c4f3;
  border-radius: 10px;
  z-index: 1;

  animation: ${dropAnimation} 1s alternate;
`;

export default FeedDetail;
