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
  const [reviewList, setReviewList] = useState<ReviewListProps>();
  // const [hasMore, setHasMore] = useState<boolean>(true);
  const [textarea, setTextarea] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [updatedReview, setUpdatedReview] = useState<string>('');
  const [clickedReview, setClickedReview] = useState<string>('');
  const [dropDownVisible, setDropDownVisible] = useState<boolean>(false);

  async function get() {
    // 해당 Feed 에 있는 Review들만 가져오기
    const getReviewByFeedID: ReviewListProps = await ReviewApi.getReviewsByFeedID(feedId);
    // console.log('feedId, getReviewByFeedID : ', feedId, getReviewByFeedID);
    setReviewList(getReviewByFeedID);
  }

  useEffect(() => {
    get();
  }, []);
  // console.log('reviewList : ', reviewList);
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
    setTextarea('');
    get();
  };

  const updateReview = async (review_id, updatedContent) => {
    const updatedData = { contents: updatedContent };
    if (!confirm('이 수정내용을 반영하시겠습니까?')) return;
    try {
      const res = await ReviewApi.updateOneReview(review_id, updatedData);
      alert('댓글이 수정되었습니다!');
      console.log('updatedReview : ', res);
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
          <Comment.Group className="commentGroup">
            <Header as="h2" className="commentHeader" dividing>
              Comment
            </Header>

            <StyledCommentBody>
              {reviewList?.map((review, index) => (
                <Comment
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    margin: '15px',
                    border: '0',
                    // border: '1px solid white',
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    padding: '5px',
                  }}
                >
                  <div
                    style={{ display: 'flex', gap: '10px', height: '50px', position: 'relative' }}
                  >
                    <Comment.Avatar
                      src="https://react.semantic-ui.com/images/avatar/small/matt.jpg"
                      alt="User"
                    />
                    <Comment.Author
                      as="a"
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        width: '50%',
                        position: 'relative',
                        height: '100%',
                        lineHeight: '50px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {review.userName}
                    </Comment.Author>
                    <Comment.Metadata
                      style={{
                        fontSize: '1.2rem',
                        width: '40%',
                        position: 'relative',
                        height: '100%',
                        lineHeight: '50px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {review.createdAt?.substr(0, 10)}
                    </Comment.Metadata>
                  </div>
                  <div>
                    <Comment.Content style={{ margin: 0, padding: 0 }}>
                      {isEdit && review._id === clickedReview ? (
                        <input
                          style={{
                            width: '100%',
                            // backgroundColor: 'red',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                          type="text"
                          placeholder={review.contents}
                          onChange={onChangeReview}
                        />
                      ) : (
                        <Comment.Text
                          style={{
                            // backgroundColor: 'red',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {review.contents}
                        </Comment.Text>
                      )}
                    </Comment.Content>
                  </div>
                  {review.userId === userId ? (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                      {isEdit && review._id === clickedReview ? (
                        <Button
                          content="반영"
                          // labelPosition="right"
                          primary
                          onClick={() => {
                            updateReview(review._id, updatedReview);
                          }}
                        />
                      ) : (
                        <Button
                          content="수정"
                          // labelPosition="right"
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
                          // labelPosition="right"
                          primary
                          onClick={() => {
                            setIsEdit((prev) => !prev);
                          }}
                        />
                      ) : (
                        <Button
                          content="삭제"
                          // labelPosition="right"
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
                content="작성"
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

const StyledSlide = styled.div<{ src: string }>`
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

  .commentGroup {
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    height: 100%;
    // padding: 5px;
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
              width: 70px;
              font-size: 1.6rem;
              font-weight: 600;
              margin-right: 15px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .metaData {
              width: 120px;
              color: rgba(0, 0, 0, 0.4);
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }

          .text {
            width: 200px;

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

  // border: 10px solid black;
  border-radius: 10px;
  background-color: #cfe7d8;
  overflow-y: scroll;
`;

const StyledCommentInput = styled.div`
  width: 100%;
  height: 40px;
  // position: relative;
  gap: 20px;
  display: flex;
`;
export default FeedDetail;
