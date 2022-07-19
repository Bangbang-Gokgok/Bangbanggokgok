import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { BsSearch } from 'react-icons/bs';

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
  padding-left: 10px;
  // margin: 0 10px;

  background-color: rgb(235, 235, 235);
`;
const StyledSearchIconContainer = styled.button`
  position: absolute;
  right: 12px;
  top: 7px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const Input = (
  {
    onKeyPressSearch,
    handleInput,
    onClickSearch
  }
    : { handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void; } & { onClickSearch: () => void; } & { onKeyPressSearch: (e: React.KeyboardEvent<HTMLElement>) => void; }
) => {
  return (
    <StyledInputContainer>
      <StyledInput onKeyPress={onKeyPressSearch} onChange={handleInput}></StyledInput>

      <StyledSearchIconContainer onClick={onClickSearch}>
        <IconContext.Provider value={{ size: '20px' }}>
          <BsSearch></BsSearch>
        </IconContext.Provider>
      </StyledSearchIconContainer>
    </StyledInputContainer>
  );
};

export default Input;
