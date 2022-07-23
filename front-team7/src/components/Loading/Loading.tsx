import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';

const StyledLoadingContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  border-radius: 15px;

  h2 {
    color: whitesmoke;
  }
`;

const Loading = ({ type }: { type?: string }) => {
  return (
    <StyledLoadingContainer>
      {type !== 'end' && <ThreeDots color="gold" />}
      {type === 'end' && <h2>방방곡곡과 함께 떠나요 😋</h2>}
    </StyledLoadingContainer>
  );
};

export default Loading;
