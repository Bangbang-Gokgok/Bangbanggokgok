import { IconContext } from 'react-icons';
import { BsSearch } from 'react-icons/bs';
import {
  StyledInputContainer,
  StyledInput,
  StyledSearchIconContainer,
} from '@/components/Input/StyleInput';

const Input = ({
  onKeyPressSearch,
  handleInput,
  onClickSearch,
}: { handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void } & {
  onClickSearch: () => void;
} & { onKeyPressSearch: (e: React.KeyboardEvent<HTMLElement>) => void }) => {
  return (
    <StyledInputContainer>
      <StyledInput onKeyPress={onKeyPressSearch} onChange={handleInput}></StyledInput>

      <StyledSearchIconContainer onClick={onClickSearch}>
        <IconContext.Provider value={{ size: '25px' }}>
          <BsSearch></BsSearch>
        </IconContext.Provider>
      </StyledSearchIconContainer>
    </StyledInputContainer>
  );
};

export default Input;
