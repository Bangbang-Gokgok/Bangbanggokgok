import { Main } from '@/components/Layout';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineHome, AiFillFrown } from 'react-icons/ai';
import { TbArrowBackUp } from 'react-icons/tb';

const NotFound = () => {
  return (
    <Main>
      <Title>
        <CommentIcon>
          <AiFillFrown />
        </CommentIcon>
        <CommentTitle>404</CommentTitle>
        <Comment>NOT FOUND</Comment>
        <GoHome>
          <LinkTag to="/">Go Home</LinkTag>
        </GoHome>
      </Title>
    </Main>
  );
};

const Title = styled.p`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 7rem;
  color: black;
  p {
    text-align: center;
  }
`;

const CommentTitle = styled.span`
  width: 100%;
  text-align: center;
  line-height: 6.5rem;
  color: ${(props) => props.theme.accentColor};
  -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
  clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
  transform: translateY(-50px);
  opacity: 0;
  animation-name: titleAnimation;
  animation-timing-function: ease;
  animation-duration: 5s;
  animation-delay: 0.6s;
  animation-iteration-count: infinite;
  &:first-child {
    animation-delay: 0.7s;
  }
  &:last-child {
    animation-delay: 0.5s;
  }

  @keyframes titleAnimation {
    0% {
      transform: translateY(-50px);
      opacity: 0;
      -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
      clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
    }
    20% {
      transform: translateY(0);
      opacity: 1;
      -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
      clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
    }
    80% {
      transform: translateY(0);
      opacity: 1;
      -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
      clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
    }
    100% {
      transform: translateY(50px);
      opacity: 0;
      -webkit-clip-path: polygon(100% 0, 100% -0%, 0 100%, 0 100%);
      clip-path: polygon(100% 0, 100% -0%, 0 100%, 0 100%);
    }
  }
`;

const Comment = styled(CommentTitle)`
  font-size: 3rem;
`;

const CommentIcon = styled(CommentTitle)`
  font-size: 10rem;
`;

const GoHome = styled.button`
  border: 1px solid #f39c12;
  border-radius: 5px;
  background-color: #f39c12;
  padding: 10px;
  font-size: 2.5rem;
  color: black;
`;

const LinkTag = styled(Link)`
  &:visited {
    text-decoration: none;
  }
`;

export default NotFound;
