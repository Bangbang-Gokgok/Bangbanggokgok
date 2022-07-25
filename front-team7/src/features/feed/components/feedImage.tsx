import styled from 'styled-components';

interface FeedImageProps {
  imageUrl: string;
}

export const FeedImage = ({ imageUrl }: FeedImageProps) => {
  return (
    <StyledFeedImage>
      <img className="feed-image" src={imageUrl} alt="feed" />
    </StyledFeedImage>
  );
};

const StyledFeedImage = styled.div`
  margin: 0 auto;
  width: 400px;
  height: 300px;
  border-radius: 5px;

  .feed-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
