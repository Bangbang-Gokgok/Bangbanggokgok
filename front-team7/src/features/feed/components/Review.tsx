import { useState } from 'react';
import styled from 'styled-components';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdModeComment } from 'react-icons/md';
import { useRecoilValue } from 'recoil';
import { userFieldQuery } from '@/store';

import { updateOneReview, deleteOneReview } from '@/api/review';

import { Icon } from '@/components/Icon';
import { Link } from 'react-router-dom';

export interface Review {
  review: {
    contents: string;
    createdAt: string;
    feedId: string;
    updatedAt: string;
    userId: string;
    userName: string;
    _id: string;
  };
  setRefresh: () => void;
}

export const Review = ({ review, setRefresh }: Review) => {
  const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);
  const [editInitValue, setInitEditValue] = useState(review?.contents);
  const [editValue, setEditValue] = useState(review?.contents);
  const currentUserId = useRecoilValue(userFieldQuery('id'));
  const date = new Date(review.createdAt);
  const convertedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  const control = !isEditBtnClicked && currentUserId === review.userId;

  return (
    <StlyedReview>
      <div className="review-top">
        {/* <UserInfo name={review?.userName} userId={review.userId} /> */}
        <Link className="name-link" to={`/profile/${review.userId}`}>
          <span className="comment-icon">
            <MdModeComment size="2.0rem" />
          </span>
          {review?.userName}
        </Link>
        <span className="review-date">📅 {convertedDate}</span>
      </div>
      {!isEditBtnClicked && <span className="review-text">{editInitValue}</span>}
      {isEditBtnClicked && (
        <div className="review-text review-edit-input">
          <textarea value={editValue} onChange={(e) => setEditValue(e.target.value)}></textarea>
        </div>
      )}

      {control && (
        <div className="icon-container">
          <span>
            <button
              onClick={() => {
                if (!isEditBtnClicked) setIsEditBtnClicked(true);
                else {
                  setIsEditBtnClicked(false);
                  setEditValue(editInitValue);
                }
              }}
            >
              <Icon kind="square" size="sm" element={<AiFillEdit size="2.4rem" />} />
            </button>
          </span>
          <span>
            <button
              onClick={async () => {
                if (confirm('해당 댓글을 정말 삭제하시겠습니까?')) {
                  await deleteOneReview(review._id, review.userId);
                  setRefresh({});
                }
              }}
            >
              <Icon kind="square" size="sm" element={<AiFillDelete size="2.2rem" />} />
            </button>
          </span>
        </div>
      )}
      {isEditBtnClicked && (
        <div className="icon-container">
          <button
            onClick={async () => {
              await updateOneReview(review._id, editValue, review.userId);
              setInitEditValue(editValue);
              setIsEditBtnClicked(false);
            }}
          >
            수정
          </button>
          <button
            onClick={() => {
              setIsEditBtnClicked(false);
              setEditValue(editInitValue);
            }}
          >
            취소
          </button>
        </div>
      )}
    </StlyedReview>
  );
};

const StlyedReview = styled.div`
  background-color: #dddddd;
  border-radius: 8px;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  color: #333333;

  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }

  .review-top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .name-link {
      display: flex;
      align-items: center;
      gap: 3px;
      color: #333333;
      font-weight: bold;
    }

    .review-date {
      font-size: 1.4rem;
    }
  }

  .review-edit-input {
    textarea {
      width: 100%;
      min-height: 60px;
      padding: 10px;
      border-radius: 5px;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    }
  }

  .icon-container {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }

  .review-text {
    display: block;
    padding: 0 30px;
    padding-right: 70px;
    padding-top: 7px;
    font-size: 1.45rem;
    word-wrap: break-word;
    word-break: break-all;
  }
`;
