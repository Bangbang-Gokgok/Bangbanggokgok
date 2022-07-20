import styled from 'styled-components';
const StyledInputContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
`;
const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  font-size: 15px;
  border: 0;
  border-radius: 15px;
  outline: none;
  padding: 15px;
  background-color: rgb(235, 235, 235);

  @media only screen and (min-width: 768px) {
    padding: 25px;
  }

  @media only screen and (min-width: 1024px) {
    padding: 25px;
  }
`;
const StyledSearchIconContainer = styled.button`
  position: absolute;
  right: 3%;
  top: 20%;
  border: none;
  background-color: transparent;
  cursor: pointer;

  @media only screen and (min-width: 768px) {
    right: 3%;
    top: 25%;
  }

  @media only screen and (min-width: 1024px) {
    right: 3%;
    top: 25%;
  }
`;

export { StyledInputContainer, StyledInput, StyledSearchIconContainer };
