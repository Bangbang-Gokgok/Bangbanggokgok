import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { BsSearch } from 'react-icons/bs';

const InputContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
`;
const Input = styled.input`
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
const SearchIconContainer = styled.div`
  position: absolute;
  right: 12px;
  top: 7px;
`;

const InputComponent = () => {
  return (
    <InputContainer>
      <Input></Input>

      <SearchIconContainer>
        <IconContext.Provider value={{ size: '20px' }}>
          <BsSearch></BsSearch>
        </IconContext.Provider>
      </SearchIconContainer>
    </InputContainer>
  );
};

export default InputComponent;
