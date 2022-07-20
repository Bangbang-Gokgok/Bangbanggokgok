import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { type FeedsResponse } from '@/store';
import noImage from '@/assets/images/no-image.png';

interface PostProps {
  feeds: Partial<FeedsResponse>;
}

export const Post = ({ feeds }: PostProps) => {
  const { userId, title, description, address, location, imageUrl, createdAt } = feeds;

  const image = imageUrl![0] ?? noImage;

  return (
    <StyledPost image={image}>
      <Link
        to={`/feedmap/${userId}?lat=${location?.lat}&lng=${location?.lng}`}
        className="post-link"
      >
        <div className="img-container">
          <img className="post-image" src={image} alt={title} />
        </div>
        <div className="post-info-container">
          <div className="post-info">
            <span className="title">{title}</span>
            <span className="description">{description}</span>
          </div>
          <div className="post-sub-info">
            <span className="address">🌎 {address}</span>
            <div className="post-date">
              <span>📅 {createdAt} 작성</span>
            </div>
          </div>
        </div>
      </Link>
    </StyledPost>
  );
};

const StyledPost = styled.article<{ image: string }>`
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
    height: 190px;
    transition: filter 0.3s ease-in-out;

    &:hover {
      filter: brightness(0.7);
    }

    .post-image {
      width: 100%;
      height: 100%;
      object-fit: ${({ image }) => (image === noImage ? 'contain' : 'cover')};
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
      text-align: center;
      width: 150px;
      word-break: break-all;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .description {
      display: block;
      width: 150px;
      font-size: 1.4rem;
      line-height: 1.5;
      margin: 0;
      padding-bottom: 5px;
      font-weight: normal;
      text-align: center;
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
      width: 150px;
      word-break: break-all;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .post-date {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.3rem;
      bottom: 0;

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
      height: 200px;
    }
  }

  @media screen and (min-width: 700px) {
    .img-container {
      height: 175px;
    }
  }

  @media screen and (min-width: 768px) {
    .img-container {
      height: 200px;
    }
  }

  @media screen and (min-width: 860px) {
    .img-container {
      height: 175px;
    }
  }

  @media screen and (min-width: 1100px) {
    .img-container {
      height: 200px;
    }
  }
`;
