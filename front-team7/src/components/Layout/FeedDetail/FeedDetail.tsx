import React from 'react';
import styled, { css } from 'styled-components';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { FeedHeader } from '@/components/FeedHeader/FeedHeader';
import { UserInfoProps } from '@/components/UserInfo';
import Carousel from 'react-material-ui-carousel';
import { useEffect, useState, useRef } from 'react';
import { Button, Comment, Form, Header, TextArea } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '@/components/Loading/Loading';
import * as ReviewApi from '@/api/review';
import { BsArrowReturnRight } from 'react-icons/bs';
interface FeedDetailContainerProps {
  boxShadow: boolean;
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

interface ReviewListProps extends Array<ReviewProps> { }

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
}: UserInfoProps & { userId: string; } & { title: string; } & { feedImg?: Array<string>; } & {
  feedUser?: string;
} & {
  feedLocation?: CenterLatLng;
} & { feedId?: string; } & { desc: string; } & { isModal: boolean; }) => {
  const [reviewList, setReviewList] = useState<ReviewListProps>(REVIEW_MOCK);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [textarea, setTextarea] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [updatedReview, setUpdatedReview] = useState<string>('');
  const [clickedReview, setClickedReview] = useState<string>('');

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
          <div>댓글 {reviewList.length}개</div>
        </StyledFeedDetailInfo>
      </StyledFeedDetailBody>
      <StyledFeedDetailReview>
        <Comment.Group>
          <Header as="h4" dividing>
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
                <Comment key={index}>
                  <Comment.Avatar
                    src="https://react.semantic-ui.com/images/avatar/small/matt.jpg"
                    alt="User"
                  />
                  <Comment.Content className={'content'}>
                    <div className={'content-info'}>
                      <Comment.Author as="a" className={'author'}>
                        {review.userName}
                      </Comment.Author>
                      <Comment.Metadata className={'metaData'}>
                        <div>{review.createdAt}</div>
                      </Comment.Metadata>
                    </div>
                    {isEdit && review._id === clickedReview ? (
                      <input type="text" placeholder={review.contents} onChange={onChangeReview} />
                    ) : (
                      <Comment.Text className={'text'}>{review.contents}</Comment.Text>
                    )}
                  </Comment.Content>
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

                      <Button
                        content="삭제"
                        labelPosition="left"
                        primary
                        onClick={() => {
                          deleteReview(review._id);
                        }}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </Comment>
              ))}
            </InfiniteScroll>
          </StyledCommentBody>
          <TextArea
            ref={textAreaContent}
            onChange={onChange}
            value={textarea}
            style={{ width: 120 }}
            placeholder="댓글 작성..."
          />
          <Button
            content="댓글 달기"
            labelPosition="left"
            icon="edit"
            primary
            onClick={() => {
              createReview();
            }}
          />
        </Comment.Group>
      </StyledFeedDetailReview>
    </StyledFeedDetailContainer>
  );
};

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

const StyledSlide = styled.div<{ src: string; }>`
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

const StyledFeedDetailReview = styled.div`
  width: 100%;
  height: 300px;
  background-color: #d9d9d9;
  border-radius: 0px 0px 10px 10px;

  .comment {
    font-size: 1.4rem;
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
      background-color: yellow;
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
`;

const StyledCommentBody = styled.div`
  width: 100%;
  height: 150px;
  border: 10px solid black;
  // background-color: yellow;
  overflow-y: scroll;
`;
export default FeedDetail;
