import styled from 'styled-components';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
const StyleNav = styled(NavLink)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 10%;
  font-size: 2.2rem;
  color: black;
`;

const StyleEditIcon = styled(AiFillEdit)`
  font-size: 1.8rem;
`;

const StyleDeleteIcon = styled(AiFillDelete)`
  font-size: 1.8rem;
`;

const StyledFeedHeader = styled.div<{ isModal: boolean }>`
  display: flex;
  height: 60px;
  align-items: center;
  gap: 8px;
  // min-height: 60px;
  padding: 20px 10px;
  border: 1px solid rgba(0, 0, 0, 15%);

  ${(props) => (props.isModal ? 'border-radius: 10px;' : 'border-radius: 10px 10px 0 0;')}
  box-shadow: 0 0.3rem 0.4rem rgba(0, 0, 0, 25%);
  background-color: white;

  .user-info-container {
    width: 35%;
    word-break: break-all;
  }

  .title-container {
    width: 60%;
    font-size: 1.45rem;
    font-weight: 500;
    word-break: break-all;
    ${(props) => props.isModal && 'cursor: pointer;'}
  }

  /* @media only screen and (min-width: 768px) {
  min-height: 70px;
}

@media only screen and (min-width: 1024px) {
  min-height: 80px;
} */
`;

export { StyleNav, StyleEditIcon, StyleDeleteIcon, StyledFeedHeader };
