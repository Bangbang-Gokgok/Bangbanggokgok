import styled from "styled-components";

const NotFound = () => {
  return (
    <Container>
      <Comment>404 not found</Comment>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Comment = styled.span`
  font-size: 2rem;
  color: blue;
`;

export default NotFound;