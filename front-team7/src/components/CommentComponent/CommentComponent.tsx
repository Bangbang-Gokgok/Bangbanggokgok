import { useState, useRef } from 'react';
import { Button, Comment, Form, Header, TextArea } from 'semantic-ui-react';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store';
import { ReviewProps } from '@/types/feed';

import * as ReviewApi from '@/api/review';
import {
  StyledCommentBody,
  StyledCommentInput,
  StyledCommentGroup,
} from '@/components/CommentComponent/StyleCommentComponent';

const CommentComponent = ({ reviewList, currentFeedList, get, currentUserId }) => {
  const currentUser = useRecoilValue(userState);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [updatedReview, setUpdatedReview] = useState<string>('');
  const [clickedReview, setClickedReview] = useState<string>('');
  const [textarea, setTextarea] = useState<string>('');

  const textAreaContent = useRef<any>();

  const onChange = (e) => {
    const textarea = e.target.value;
    setTextarea(textarea);
  };

  const onChangeReview = (e) => {
    const changedReview = e.target.value;
    setUpdatedReview(changedReview);
  };

  //  *********** 댓글 등록 (create) ***********

  const createReview = async () => {
    if (!confirm('댓글을 등록하시겠습니까?')) return;

    const review: ReviewProps = {
      userName: currentUser?.name,
      contents: textAreaContent.current?.ref.current.value,
      feedId: currentFeedList._id,
    };

    try {
      const createdReview = await ReviewApi.createOneReview(review);
      alert('성공적으로 댓글이 등록되었습니다!');
    } catch (err) {
      alert('Error 발생 ');
      console.log(err);
    }
    setTextarea('');
    get();
  };

  //  *********** 댓글 수정 (update) ***********
  const updateReview = async (review_id, updatedContent, user_id) => {
    if (!confirm('이 수정내용을 반영하시겠습니까?')) return;
    try {
      const updatedReview = await ReviewApi.updateOneReview(review_id, updatedContent, user_id);
      alert('댓글이 수정되었습니다!');
    } catch (err) {
      alert('Error 발생 ');
      console.log(err);
    }
    setIsEdit((prev) => !prev);
    get();
  };

  //  *********** 댓글 삭제 (delete) ***********
  const deleteReview = async (review_id, currentUserId) => {
    if (!confirm('이 댓글을 삭제하시겠습니까?')) return;
    try {
      const deletedReview = await ReviewApi.deleteOneReview(review_id, currentUserId);
      alert('댓글이 삭제되었습니다!');
    } catch (err) {
      alert('Error 발생 ');
      console.log(err);
    }
    get();
  };

  return (
    <StyledCommentGroup>
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
              backgroundColor: 'white',
              borderRadius: '10px',
              overflow: 'hidden',
              padding: '5px',
            }}
          >
            <div style={{ display: 'flex', gap: '10px', height: '50px', position: 'relative' }}>
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
            {review.userId === currentUserId ? (
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                {isEdit && review._id === clickedReview ? (
                  <Button
                    content="반영"
                    primary
                    onClick={() => {
                      updateReview(review._id, updatedReview, currentUserId);
                    }}
                  />
                ) : (
                  <Button
                    content="수정"
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
                    primary
                    onClick={() => {
                      setIsEdit((prev) => !prev);
                    }}
                  />
                ) : (
                  <Button
                    content="삭제"
                    primary
                    onClick={() => {
                      deleteReview(review._id, currentUserId);
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
    </StyledCommentGroup>
  );
};

export default CommentComponent;
