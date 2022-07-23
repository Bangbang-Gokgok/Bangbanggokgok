import { useState, useEffect } from 'react';
import { axios } from '@/lib';
import styled from 'styled-components';
import Carousel from 'react-material-ui-carousel';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { AiFillCalendar, AiOutlineComment } from 'react-icons/ai';
import { FcNext, FcPrevious } from 'react-icons/fc';
import { createOneReview } from '@/api/review';
import { useRecoilValue } from 'recoil';
import { userFieldQuery } from '@/store';

import { RiHeart3Fill, RiHeart3Line } from 'react-icons/ri';
import { sendSocketMessage } from '@/lib/socket';

import { FeedProps } from '@/types/feed';

import { FeedImage } from '@/features/feed/components';
import { Review } from '@/features/feed/components';

interface FeedModalProps {
  feed: FeedProps;
}

const perPage = 5;

export const FeedModal = ({ feed }: FeedModalProps) => {
  // TODO: 로직 분리 리팩토링 필요

  const [reviews, setReviews] = useState([]);
  const [refresh, setRefresh] = useState({});
  const [page, setPage] = useState<number>(1);
  const [comment, setComment] = useState('');
  const currentUserName = useRecoilValue(userFieldQuery('name'));
  const currentUserId = useRecoilValue(userFieldQuery('id'));

  console.log(reviews);

  useEffect(() => {
    async function getReviews() {
      const reviewData = await axios.get(`/api/reviews/page/list/feed/${feed._id}`, {
        params: {
          page,
          perPage,
        },
      });

      return reviewData;
    }

    getReviews()
      .then(setReviews)
      .catch((e) => console.log(e));
  }, [refresh, page]);

  const reviewList = reviews?.reviewList ? reviews.reviewList : [];
  const totalCount = reviews?.total;
  const totalPage = reviews?.totalPage;

  const date = new Date(feed.createdAt);
  const convertedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

  async function onCreateComment() {
    if (comment === '') return;

    const requestData = {
      userName: currentUserName,
      contents: comment,
      feedId: feed._id,
    };
    await createOneReview(requestData);
    setComment('');

    if (totalCount % perPage === 0) {
      setPage(totalPage + 1);
    } else {
      setPage(totalPage);
    }

    setRefresh({});
  }

  const handleFeedLike = (currentFeedList: FeedProps) => {
    sendSocketMessage({
      myUserId: currentUserId as string,
      feedId: currentFeedList._id,
    });
  };

  return (
    <StyledFeedModal>
      <div className="top">
        <div className="top-line">
          <h2 className="feed-title">{feed.title}</h2>
          <div className="likes">
            <button onClick={() => handleFeedLike(feed)}>
              {feed?.likes.hasOwnProperty(currentUserId as string) ? (
                <RiHeart3Fill color="red" size="2.5rem" />
              ) : (
                <RiHeart3Line color="red" size="2.5rem" />
              )}
            </button>
            <span>{Object.keys(feed?.likes).length} like</span>
          </div>
        </div>
        <span className="info">
          <FaMapMarkerAlt color="gold" />
          {feed.address}
        </span>
        <span className="info">
          <AiFillCalendar color="gold" />
          {convertedDate}
        </span>
      </div>
      {feed.imageUrl.length > 0 && (
        <div className="image-container">
          <Carousel
            className="carousel"
            indicators={true}
            autoPlay={false}
            navButtonsAlwaysVisible={true}
          >
            {feed.imageUrl.map((image, index) => (
              <FeedImage key={index} imageUrl={image} />
            ))}
          </Carousel>
        </div>
      )}

      <div className="description-container">
        <p>{feed.description}</p>
      </div>

      <div className="comment-container">
        <div>
          <span>
            <AiOutlineComment color="gold" />
          </span>
          <span> Comments ({totalCount})</span>
        </div>
      </div>
      <hr />

      <div className="review-container">
        {reviewList &&
          reviewList.map((review) => (
            <Review key={review._id} review={review} setRefresh={setRefresh} />
          ))}

        <div className="pagenation-btn-container">
          <button
            onClick={() => {
              if (page === 1) return;
              setPage(page - 1);
            }}
          >
            <FcPrevious size="2.5rem" />
          </button>

          <button
            onClick={() => {
              if (page === totalPage) return;
              setPage(page + 1);
            }}
          >
            <FcNext size="2.5rem" />
          </button>
        </div>

        <div className="create-comment">
          <textarea
            className="create-input"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="create-btn-container">
            <button onClick={onCreateComment} className="create-btn">
              댓글 등록
            </button>
          </div>
        </div>
      </div>
    </StyledFeedModal>
  );
};

const StyledFeedModal = styled.div`
  width: 350px;
  height: 500px;
  padding: 40px 20px;
  background-color: #222;
  color: whitesmoke;
  overflow-y: auto;
  border-radius: 7px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  .top-line {
    display: flex;
    justify-content: space-between;
  }

  .likes {
    display: flex;
    align-items: center;
    button {
      background: none;
      border: none;
      cursor: pointer;
    }
  }

  hr {
    border: 1px solid #3f3f3f;
  }

  .top {
    margin-bottom: 10px;
    .feed-title {
      margin: 0;
    }
    .info {
      display: flex;
      align-items: center;
      gap: 3px;
    }
  }

  .create-comment {
    margin: 15px 0;

    .create-input {
      padding: 10px;
      width: 100%;
      height: 120px;
      border-radius: 6px;
      font-weight: bold;
      padding: 15px;

      &:focus {
        outline: none;
      }
    }

    .create-btn-container {
      display: flex;
      justify-content: flex-end;

      .create-btn {
        margin-top: 5px;
        align-self: end;
        border: none;
        padding: 4px 8px;
        border-radius: 3px;
        height: 40px;
        width: 80px;
        font-weight: bold;
        min-width: 70px;
        color: #242424;
        transition: background-color 0.3s ease;
        background-color: whitesmoke;
        cursor: pointer;

        &:hover {
          background-color: #d3d3d3;
        }
      }
    }
  }

  .pagenation-btn-container {
    width: 100%;
    margin: 3px 0;

    button {
      padding: 8px 16px;
      border-radius: 5px;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease;
      box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;

      &:first-child {
        float: left;
      }

      &:last-child {
        float: right;
      }

      &:hover {
        background-color: #d3d3d3;
      }
    }
  }

  .carousel {
    display: flex;
    height: 100%;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    /* background-color: #272727; */
    border-radius: 10px;
    height: 400px;
  }

  .comment-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    font-size: 1.8rem;
  }

  .description-container {
    padding: 20px;
    background-color: #393939;
    border-radius: 4px;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  }

  .review-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px 0;
  }

  @media screen and (min-width: 540px) {
    width: 500px;
    height: 600px;
    padding: 40px;

    .review-container {
      padding: 20px;
    }
  }

  @media screen and (min-width: 768px) {
    width: 700px;
    height: 650px;
  }

  @media screen and (min-width: 1024px) {
    width: 750px;
  }
`;
