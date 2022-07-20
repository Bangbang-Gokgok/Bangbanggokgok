import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BsCalendar3 } from 'react-icons/bs';

import { type FeedsResponse } from '@/store';

interface PostProps {
  feeds: Partial<FeedsResponse>;
}

export const Post = ({ feeds }: PostProps) => {
  const { userId, title, description, address, location, imageUrl, createdAt } = feeds;

  return (
    <StyledPost>
      <Link
        to={`/feedmap/${userId}?lat=${location?.lat}&lng=${location?.lng}`}
        className="post-link"
      >
        <div className="img-container">
          <img className="post-image" src={imageUrl![0]} alt={title} />
        </div>
        <div className="post-info-container">
          <div className="post-info">
            <h1 className="title">{title}</h1>
            <h2 className="description">{description}</h2>
          </div>
          <div className="post-sub-info">
            <span className="address">{address}</span>
            <div className="post-date">
              <span>📅 {createdAt} 작성</span>
            </div>
          </div>
        </div>
      </Link>
    </StyledPost>
  );
};

const StyledPost = styled.article`
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
  background: #f3f6fb;
  letter-spacing: 0.5px;
  width: 250px;
  margin: 0 auto;

  .post-link {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    color: #333333;
  }

  .img-container {
    width: 100%;
    height: 125px;
    transition: filter 0.3s ease-in-out;

    &:hover {
      filter: brightness(0.7);
    }

    .post-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-top-right-radius: 7px;
      border-top-left-radius: 7px;
    }
  }

  .post-info-container {
    width: 100%;
    padding: 12px;
  }

  .post-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      font-size: 1.5rem;
      font-weight: bold;
      line-height: 1.5;
      margin: 0rem;
      padding: 3px 6px;
      border-radius: 5px;
      word-break: break-all;
    }

    .description {
      display: block;
      width: 150px;
      font-size: 1.4rem;
      line-height: 1.5;
      font-weight: normal;
      margin: 5px 0;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .post-sub-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;

    .address {
      font-size: 1.3rem;
    }

    .post-date {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: 1.3rem;

      .date-icon {
        margin-top: 0.1rem;
        margin-right: 0.5rem;
        color: #e25050;
      }
    }
  }

  @media screen and (min-width: 520px) {
    width: 100%;
  }

  @media screen and (min-width: 620px) {
    .img-container {
      height: 150px;
    }
  }

  @media screen and (min-width: 700px) {
    .img-container {
      height: 110px;
    }
  }

  @media screen and (min-width: 768px) {
    .img-container {
      height: 150px;
    }
  }

  @media screen and (min-width: 860px) {
    .img-container {
      height: 125px;
    }
  }
`;
