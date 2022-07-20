import styled from 'styled-components';

const StyledModalForm = styled.div`
  width: 330px;
  height: 400px;
  overflow-y: scroll;
  border-radius: 10px;
  background-color: white;
`;

const StyledFormContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(219, 219, 219);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: white;
    border-radius: 0 10px 10px 0;
  }
`;

const StyledTitle = styled.div`
  width: 100%;
  padding: 15px;
  border-bottom: 1px solid rgb(219, 219, 219);
  text-align: center;
`;

const StyledTitleSpan = styled.span`
  font-size: 1.8rem;
  font-weight: 500;
`;

const StyledInputContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 0 15px;
  flex-direction: column;
  border-bottom: 1px solid rgb(219, 219, 219);
`;

const StyledImgInputContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 0 15px;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid rgb(219, 219, 219);
`;

const StyledField = styled.label`
  font-size: 1.2rem;
  font-weight: 600;
`;

const StyledInputTitle = styled.input.attrs({
  placeholder: '제목 입력...',
})`
  width: 100%;
  font-size: 1.5rem;
  padding: 5px;
  border: none;
  &:focus {
    outline: none;
    background-color: transparent;
  }
`;

const StyledInputText = styled.textarea.attrs({
  placeholder: '글 입력...',
})`
  width: 100%;
  height: 100px;
  font-size: 1.5rem;
  padding: 5px;
  border: none;
  resize: none;
  overflow-y: scroll;
  &:focus {
    outline: none;
    background-color: transparent;
  }
`;

const StyledImgLabel = styled.label.attrs({
  htmlFor: 'image',
})`
  padding-right: 6px;
  font-size: 3rem;
  cursor: pointer;
`;

const StyledInputImg = styled(StyledInputTitle).attrs({
  type: 'file',
  id: 'image',
  accept: 'image/*',
  multiple: true,
})`
  display: none;
`;

const StyledPreviewImgWrapper = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid rgb(219, 219, 219);
`;

const StyledPreviewImg = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  margin: 0 auto;
`;

const StyledPreviewImgSrc = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledPreviewDeleteButton = styled.input`
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(50%, -50%);
  font-size: 1.5rem;
  background-color: transparent;
  border: none;
`;

const StyledSearchAddress = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledInputSearchAddress = styled.input.attrs({
  type: 'text',
  id: 'searching',
  placeholder: '장소 검색...',
})`
  width: 100%;
  height: 34px;
  font-size: 1.5rem;
  border: none;
  &:focus {
    outline: none;
    background-color: transparent;
  }
`;

const StyledButtonSearchAddress = styled.button`
  border: none;
  background-color: transparent;
  font-size: 3rem;
`;

const StyledSearchResultContainer = styled.div`
  width: 100%;
  max-height: 200px;
  overflow-y: scroll;
`;

const StyledSearchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin: 10px 0 10px 0;
`;

const StyledSearchData = styled.div`
  position: relative;
  width: 80%;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-radius: 20px;
  background-color: whitesmoke;
  box-shadow: 5px 5px 5px #c2c2c2;
  transition: all 0.5s linear;
  cursor: pointer;
  &:hover {
    box-shadow: none;
  }
`;

const StyledSearchInfoHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.8rem;
`;

const StyledSearchInfoTitle = styled.span`
  font-weight: 500;
`;

const StyledFiExternalLink = styled.a.attrs({
  target: '_blank',
})`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 1.8rem;
  cursor: pointer;
  color: #487eb0;
  &:hover {
    color: #67a2d9;
  }
  &:visited {
    color: #487eb0;
  }
`;

const StyledAddressName = styled.span`
  font-size: 1rem;
  color: gray;
`;

const StyledSearchInfoData = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledInputAddress = styled.input.attrs({
  placeholder: '검색 결과...',
})`
  width: 100%;
  height: 34px;
  font-size: 1.5rem;
  border: none;
  &:focus {
    outline: none;
    background-color: transparent;
  }

  &:disabled {
    background-color: transparent;
  }
`;

const StyledSubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

const StyledSubmitButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1.6rem;
  width: 30%;
  padding: 10px 0;
  cursor: pointer;
  border-radius: 20px;
  transition: all 0.8s linear;
  &:hover {
    background-color: #00cec9;
  }
`;

const StyledInputError = styled.p`
  font-size: 0.5rem;
  color: red;
  text-align: right;
`;

// export * from '@/components/Form/StyleForm';

export {
  StyledInputError,
  StyledSubmitButton,
  StyledSubmitButtonWrapper,
  StyledInputAddress,
  StyledSearchInfoData,
  StyledAddressName,
  StyledFiExternalLink,
  StyledSearchInfoTitle,
  StyledSearchInfoHeader,
  StyledSearchData,
  StyledSearchContainer,
  StyledSearchResultContainer,
  StyledButtonSearchAddress,
  StyledInputSearchAddress,
  StyledSearchAddress,
  StyledPreviewDeleteButton,
  StyledPreviewImgSrc,
  StyledPreviewImg,
  StyledPreviewImgWrapper,
  StyledInputImg,
  StyledImgLabel,
  StyledInputText,
  StyledInputTitle,
  StyledField,
  StyledImgInputContainer,
  StyledInputContainer,
  StyledTitleSpan,
  StyledTitle,
  StyledFormContainer,
  StyledModalForm,
};
