import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { FeedHeader } from '@/components/FeedHeader/FeedHeader';
import { UserInfoProps } from '@/components/UserInfo';
import Carousel from 'react-material-ui-carousel';
import { useEffect, useState, useRef } from 'react';
import { Button, Comment, Form, Header, TextArea } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '@/components/Loading/Loading';
import * as ReviewApi from '@/api/review';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
interface FeedDetailContainerProps {
  boxShadow: boolean;
  // dropDownVisible: boolean;
}

interface CenterLatLng {
  lat: number;
  lng: number;
}

interface ReviewProps {
  userId: string;
  userName: string;
  contents: string;
  feedId: string;
  createdAt?: string;
}

interface ReviewListProps extends Array<ReviewProps> {}

const REVIEW_MOCK: ReviewListProps = [
  {
    userId: 'bCJcG23WB',
    userName: 'Kim Ji Hwan11111',
    contents: '정말 멋있는 댓글이군요!1111',
    feedId: 'xcgv3L5Uc',

    createdAt: 'Today at 5:42PM Today at 5:42PM Today at 5:42PM',
  },
  {
    userId: 'bCJcG23WB',
    userName: 'Kim Ji Hwan222222',
    contents: '정말 멋있는 댓글이군요!2222222',
    feedId: 'xcgv3L5Uc',
    createdAt: 'Today at 5:42PM Today at 5:42PM Today at 5:42PM',
  },
  {
    userId: 'bCJcG23WB',
    userName: 'Kim Ji Hwan333333',
    contents: '정말 멋있는 댓글이군요!3333',
    feedId: 'xcgv3L5Uc',
    createdAt: 'Today at 5:42PM Today at 5:42PM Today at 5:42PM',
  },
];

const FeedDetail = ({
  name,
  image,
  title,
  desc,
  isModal,
  userId,
  feedId,
  feedUser,
  feedImg,
  feedLocation,
}: UserInfoProps & { userId: string } & { title: string } & { feedImg?: Array<string> } & {
  feedUser?: string;
} & {
  feedLocation?: CenterLatLng;
} & { feedId?: string } & { desc: string } & { isModal: boolean }) => {
  const [reviewList, setReviewList] = useState<ReviewListProps>(REVIEW_MOCK);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [textarea, setTextarea] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [updatedReview, setUpdatedReview] = useState<string>('');
  const [clickedReview, setClickedReview] = useState<string>('');
  const [dropDownVisible, setDropDownVisible] = useState<boolean>(false);

  useEffect(() => {
    get();
  }, []);

  async function get() {
    // console.log('reviewList.length : ', reviewList.length);

    // const getReviewList: ReviewListProps = await ReviewApi.getAllReviews();
    // const getReviewByReviewID: ReviewListProps = await ReviewApi.getOneReviewByReviewID('q3BN51RU-');
    // const getReviewByUserID: ReviewListProps = await ReviewApi.getReviewsByUserID('lGl0AOVlG');
    // console.log('getReviewList : ', getReviewList);
    // console.log('getReviewByReviewID : ', getReviewByReviewID);
    // console.log('getReviewByFeedID : ', getReviewByFeedID);

    // 해당 피드에 저장된 댓글들만 가져오기
    const getReviewByFeedID: ReviewListProps = await ReviewApi.getReviewsByFeedID(feedId);
    console.log('feedId, getReviewByFeedID : ', feedId, getReviewByFeedID);
    setReviewList(getReviewByFeedID);
  }

  const fetchMoreData = async () => {
    // alert('fetchMoreData 함수 실행!');

    // 페이지네이션 처리된 이후에 이 코드 부분 리팩토링하기
    console.log('reviewList.length : ', reviewList.length);
    if (reviewList.length >= 15) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      const newItems = reviewList.concat(REVIEW_MOCK);
      setReviewList(newItems);
    }, 1000);
  };

  const textAreaContent = useRef<any>();

  const onChange = (e) => {
    const textarea = e.target.value;
    // console.log(e.target.value);
    setTextarea(textarea);
  };

  const onChangeReview = (e) => {
    const changedReview = e.target.value;
    // console.log('changedReview : ', changedReview);
    setUpdatedReview(changedReview);
  };

  const toggleDropDownVisible = () => {
    setDropDownVisible((prev) => !prev);
  };

  const createReview = async () => {
    if (!confirm('댓글을 등록하시겠습니까?')) return;

    const review: ReviewProps = {
      userName: name,
      contents: textAreaContent.current?.ref.current.value,
      feedId,
    };
    console.log('review 등록! ', review);

    try {
      const createdReview = await ReviewApi.createOneReview(review);
      alert('성공적으로 댓글이 등록되었습니다!');
      console.log('createdReview : ', createdReview);
    } catch (err) {
      alert('Error 발생 ');
      console.log(err);
    }
    get();
  };

  const updateReview = async (review_id, updatedContent) => {
    const updatedData = { contents: updatedContent };
    if (!confirm('이 수정내용을 반영하시겠습니까?')) return;
    try {
      const res = await ReviewApi.updateOneReview(review_id, updatedData);
      alert('댓글이 수정되었습니다!');
      console.log('updatedReview : ', res);

      // setReviewList((prev) => [...prev, createdReview]);
      // console.log('reviewList : ', reviewList);
    } catch (err) {
      alert('Error 발생 ');
      console.log(err);
    }
    setIsEdit((prev) => !prev);
    get();
  };

  const deleteReview = async (review_id) => {
    if (!confirm('이 댓글을 삭제하시겠습니까?')) return;
    try {
      const res = await ReviewApi.deleteOneReview(review_id);
      alert('댓글이 삭제되었습니다!');
      console.log('deletedReview : ', res);

      // setReviewList((prev) => [...prev, createdReview]);
      // console.log('reviewList : ', reviewList);
    } catch (err) {
      alert('Error 발생 ');
      console.log(err);
    }
    get();
  };

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
          <div>
            댓글 {reviewList.length}개
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
          <Comment.Group className="commentGroup">
            <Header as="h2" className="commentHeader" dividing>
              Comments
            </Header>

            {/* 여기다가 scrollableTarget을 걸면 안되나? 왜 한참 더 내려가야 fetchMoreData 가 실행되는지 알아내기! */}
            <StyledCommentBody id="main-styled">
              <InfiniteScroll
                style={{ overflow: 'visibility' }}
                dataLength={reviewList.length}
                next={fetchMoreData}
                hasMore={hasMore}
                endMessage={<span>"Loading end!"</span>}
                loader={<span>"Loading ..."</span>}
                scrollableTarget="main-styled"
              >
                {reviewList?.map((review, index) => (
                  // <Comment key={index} className={'comment'}>
                  <Comment
                    key={index}
                    style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
                  >
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <Comment.Avatar
                        src="https://react.semantic-ui.com/images/avatar/small/matt.jpg"
                        alt="User"
                      />
                      <Comment.Author
                        as="a"
                        style={{
                          fontSize: '1.7rem',

                          width: '50%',
                          height: '50px',
                          lineHeight: '50px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {review.userName + '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'}
                      </Comment.Author>
                      <Comment.Metadata
                        style={{
                          fontSize: '1.2rem',
                          width: '40%',
                          height: '50px',
                          lineHeight: '50px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <div>{review.createdAt}</div>
                      </Comment.Metadata>
                    </div>
                    <div>
                      <Comment.Content>
                        {isEdit && review._id === clickedReview ? (
                          <input
                            type="text"
                            placeholder={review.contents}
                            onChange={onChangeReview}
                          />
                        ) : (
                          <Comment.Text>{review.contents}</Comment.Text>
                        )}
                      </Comment.Content>
                    </div>
                    {review.userId === userId ? (
                      <div>
                        {isEdit && review._id === clickedReview ? (
                          <Button
                            content="반영"
                            labelPosition="left"
                            primary
                            onClick={() => {
                              updateReview(review._id, updatedReview);
                            }}
                          />
                        ) : (
                          <Button
                            content="수정"
                            labelPosition="left"
                            primary
                            onClick={() => {
                              setIsEdit((prev) => !prev);
                              setClickedReview(review._id);
                            }}
                          />
                        )}
                        {isEdit && review._id === clickedReview ? (
                          <Button
                            content="취소"
                            labelPosition="left"
                            primary
                            onClick={() => {
                              setIsEdit((prev) => !prev);
                            }}
                          />
                        ) : (
                          <Button
                            content="삭제"
                            labelPosition="left"
                            primary
                            onClick={() => {
                              deleteReview(review._id);
                            }}
                          />
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                  </Comment>
                ))}
              </InfiniteScroll>
            </StyledCommentBody>
            <StyledCommentInput>
              <TextArea
                ref={textAreaContent}
                onChange={onChange}
                value={textarea}
                style={{ width: '80%', padding: '10px' }}
                placeholder="댓글 작성..."
              />
              <Button
                content="댓글 달기"
                labelPosition="left"
                icon="edit"
                style={{ width: '20%' }}
                primary
                onClick={() => {
                  createReview();
                }}
              />
            </StyledCommentInput>
          </Comment.Group>
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
  box-shadow: ${(props) => (props.boxShadow ? '' : '0 0 15px #c2c2c2')};
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
  height: 400px;
  position: relative;
  box-sizing: border-box;
  z-index: 2;
  // margin: 10px;

  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const StyledFeedDetailDescription = styled.div`
  width: 100%;
  height: 40px;
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
  height: 300px;
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
  height: 40px;
  line-height: 40px;
  // background-color: whitesmoke;
  padding: 0 10px;
  font-size: 1.5rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
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
  height: 300px;
  margin: 10px;
  padding: 10px;
  background-color: #d9d9d9;
  border-radius: 0px 0px 10px 10px;
  z-index: 1;

  animation: ${dropAnimation} 1s alternate;

  .commentGroup {
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    height: 100%;

    .commentHeader {
      margin: 0;
      .comment {
        font-size: 1.6rem;
        display: flex;
        gap: 10px;
        background-color: red;
        position: relative;
        padding: 10px;
        white-space: nowrap;
        overflow: hidden;

        .content {
          display: flex;
          flex-direction: column;
          // background-color: yellow;
          gap: 5px;

          .content-info {
            display: flex;
            background-color: lightgray;
            height: 1.6em;
            line-height: 1.6rem;

            .author {
              width: 70px; // 반응형 처리 필요함
              font-size: 1.6rem;
              font-weight: 600;
              margin-right: 15px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .metaData {
              width: 120px; // 반응형 처리 필요함
              color: rgba(0, 0, 0, 0.4);
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }

          .text {
            width: 200px; // 반응형 처리 필요함. 퍼센트로 해도 되고!

            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 1.6rem;
          }
        }
      }
    }
  }
`;

const StyledCommentBody = styled.div`
  width: 100%;
  height: 150px;
  border: 10px solid black;
  // background-color: yellow;
  overflow-y: scroll;
`;

const StyledCommentInput = styled.div`
  width: 100%;
  // position: relative;
  gap: 20px;
  display: flex;
`;
export default FeedDetail;
