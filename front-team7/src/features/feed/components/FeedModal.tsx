import styled from 'styled-components';
import Carousel from 'react-material-ui-carousel';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { AiFillCalendar, AiOutlineComment } from 'react-icons/ai';

import { FeedListProps, FeedProps, LocationProps } from '@/types/feed';
import { useGetReviews } from '@/features/feed/api';

import { FeedImage } from '@/features/feed/components';
import { Review } from '@/features/feed/components';

interface FeedModalProps {
  feed: FeedProps;
}

export const FeedModal = ({ feed }: FeedModalProps) => {
  console.log(feed);
  const [reviews, setPage] = useGetReviews(feed._id);
  console.log(reviews);
  const date = new Date(feed.createdAt);

  const convertedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

  return (
    <StyledFeedModal>
      <div className="top">
        <h2 className="feed-title">{feed.title}</h2>
        <span className="info">
          <FaMapMarkerAlt color="gold" />
          {feed.address}
        </span>
        <span className="info">
          <AiFillCalendar color="gold" />
          {convertedDate}
        </span>
      </div>
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

      <div className="description-container">
        <p>{feed.description}</p>
      </div>

      <div className="comment-container">
        <span>
          <AiOutlineComment color="gold" />
        </span>
        <span> Comments</span>
        <hr />
      </div>

      <div className="review-container">
        {reviews?.reviewList &&
          reviews?.reviewList.map((review) => <Review key={review._id} review={review} />)}
      </div>
    </StyledFeedModal>
  );
};

const StyledFeedModal = styled.div`
  width: 750px;
  height: 650px;
  padding: 40px;
  background-color: #222;
  color: whitesmoke;
  overflow-y: auto;
  border-radius: 7px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  .top {
    .feed-title {
      margin: 0;
    }
    .info {
      display: flex;
      align-items: center;
      gap: 3px;
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
    margin-top: 15px;
    font-size: 1.8rem;

    hr {
      border: 1px solid #3f3f3f;
    }
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
    padding: 20px;
  }
`;
