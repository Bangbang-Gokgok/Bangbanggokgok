import styled from 'styled-components';

interface Review {
  contents: string;
  createdAt: string;
  feedId: string;
  updatedAt: string;
  userId: string;
  userName: string;
  _id: string;
}

export const Review = ({ review }: Review) => {
  console.log(review.contents);
  return (
    <StlyedReview>
      <span>{review.contents}</span>
    </StlyedReview>
  );
};

const StlyedReview = styled.div`
  min-height: 80px;
  background-color: #492646;
`;
