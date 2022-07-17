import styled from 'styled-components';

const StyledLoadingContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  border-radius: 15px;
`;

const StyledLoadingText = styled.span`
  font-size: 2.5rem;
  font-weight: 600;
  color: #ffffff;
  padding: 15px;
`;
const Loading = ({ text }) => {
  return (
    <StyledLoadingContainer>
      <StyledLoadingText>{text}</StyledLoadingText>
    </StyledLoadingContainer>
  );
};

export default Loading;
