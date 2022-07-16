import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { TbRoad } from 'react-icons/tb';
import { FaAddressBook, FaMapMarkedAlt, FaMousePointer, FaSave } from 'react-icons/fa';
import { MdPlace, MdShareLocation } from 'react-icons/md';
import * as Api from '@/api/feeds';
import { FiExternalLink } from 'react-icons/fi';
import { FcAddImage, FcSearch } from 'react-icons/fc';
import { useRecoilValue } from 'recoil';
import { currentFeedAtom } from '@/store/currentFeed';
import * as UserApi from '@/api/users';
import { currentUserQuery } from '@/store';

// 나중에 인터페이스 통잎해서 한 파일에 정리하기!
interface PlaceProps {
  address_name: 'string';
  category_group_code: 'string';
  category_group_name: 'string';
  category_name: 'string';
  distance: 'string';
  id: 'string';
  phone: 'string';
  place_name: 'string';
  place_url: 'string';
  road_address_name: 'string';
  x: number;
  y: number;
}

const initSelectedAddressState = {
  address: '',
  lat: 0,
  lng: 0
};
interface PlaceListProps extends Array<PlaceProps> { }

const Form = ({ isEdit }: { isEdit: boolean; }) => {
  const [searchState, setSearchState] = useState(false);
  const [selectedAddressState, setSelectedAddressState] = useState(initSelectedAddressState);
  const currentUser = useRecoilValue(currentUserQuery);
  const [placeInfoList, setPlaceInfoList] = useState<PlaceListProps>([]);
  const { register, watch, handleSubmit, reset } = useForm();
  const currentFeedState = useRecoilValue(currentFeedAtom);

  useEffect(() => {
    if (isEdit) {
      setSelectedAddressState({
        address: currentFeedState.address,
        lat: currentFeedState.location.lat,
        lng: currentFeedState.location.lng,
      });
    };
  }, []);

  // 검색어에 대한 장소 조회하기
  const searchPlace = async (e) => {
    e.preventDefault();
    const searching = watch().searching;

    const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${searching}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_SEARCH_REST_API_KEY}`,
      },
    });

    const places: PlaceListProps = res.data.documents;

    setPlaceInfoList(places);
    setSearchState(true);
  };

  // Feed CREATE
  const submitForm = async (data) => {
    if (!confirm('Feed를 추가하시겠습니까?')) return;

    const { title, description, image, } = data;


    const userName = currentUser?.name || 'undefined';

    const dummy = {
      userName,
      title,
      description,
      address: selectedAddressState.address,
      location: {
        lat: selectedAddressState.lat,
        lng: selectedAddressState.lng,
      },
    };

    const fd = new FormData();

    fd.append('userName', dummy.userName);
    fd.append('title', dummy.title);
    fd.append('description', dummy.description);
    fd.append('address', dummy.address);
    fd.append('location', JSON.stringify(dummy.location));

    for (let i = 0; i < image.length; i++) {
      fd.append('imageUrl', image[i]);
    }

    try {
      let res = await axios.post(`/api/feeds`, fd);
      alert('성공적으로 추가되었습니다.');
      console.log('create Feed : ', res);
    } catch (err) {
      console.log(err);
    }
    reset();
    setSelectedAddressState(initSelectedAddressState);
  };

  const editSubmitForm = (data) => {
    console.log(data);

  };

  const handleAddressState = (address: string, lat: number, lng: number) => {
    setSelectedAddressState((prev) => {
      return {
        ...prev,
        address,
        lat,
        lng
      };
    });
    setSearchState(false);
  };

  // <추가과제>
  // 빈 값을 넣고 엔터를 쳤을 때 axios Error 처리 하기
  // 성공적으로 값을 추가한 뒤 값을 초기화해서 빈 값으로 바꾸기
  // 여러 에러 발생 가능 => 에러 메세지 백엔드에서 구현되면, 프론트에서 보여주는 로직 추가하기 (useForm의 에러 처리 검색해보기)
  return (
    <StyledModalForm>
      <form onSubmit={handleSubmit(submitForm)}>
        <StyledFormContainer>
          <StyledTitle>
            <StyledTitleSpan>{isEdit ? '내 피드 수정하기' : '새로운 피드 만들기'}</StyledTitleSpan>
          </StyledTitle>
          <StyledInputContainer>
            <StyledField>제목</StyledField>
            <StyledInputTitle
              defaultValue={isEdit ? currentFeedState.title : ''}
              {...register('title')}
            />
          </StyledInputContainer>
          <StyledInputContainer>
            <StyledField>설명</StyledField>
            <StyledInputText
              defaultValue={isEdit ? currentFeedState.description : ''}
              {...register('description')}
            />
          </StyledInputContainer>
          <StyledImgInputContainer>
            <StyledField>사진</StyledField>
            <StyledImgLabel><FcAddImage /></StyledImgLabel>
            <StyledInputImg {...register('image')} />
          </StyledImgInputContainer>
          <StyledInputContainer>
            <StyledField>장소</StyledField>
            <StyledSearchAddress>
              <StyledInputSearchAddress {...register('searching')} />
              <StyledButtonSearchAddress
                onClick={(e) => {
                  searchPlace(e);
                }}
              >
                <FcSearch />
              </StyledButtonSearchAddress>
            </StyledSearchAddress>
          </StyledInputContainer>
          <StyledSearchResultContainer>
            {searchState &&
              <StyledSearchContainer>
                {placeInfoList?.map((place, index) => (
                  <StyledSearchData key={`${index}-${place.x}-${place.y}`}>
                    <StyledFiExternalLink href={place.place_url}>
                      <FiExternalLink />
                    </StyledFiExternalLink>
                    <StyledSearchInfoHeader>
                      <StyledSearchInfoTitle
                        onClick={() => handleAddressState(place.address_name, Number(place.y), Number(place.x))}
                      >
                        {place.place_name}
                      </StyledSearchInfoTitle>
                    </StyledSearchInfoHeader>
                    {place.road_address_name &&
                      <StyledSearchInfoData>
                        <TbRoad />
                        <StyledAddressName>{place.road_address_name}</StyledAddressName>
                      </StyledSearchInfoData>
                    }
                    <StyledSearchInfoData>
                      <MdShareLocation />
                      <StyledAddressName>{place.address_name}</StyledAddressName>
                    </StyledSearchInfoData>
                  </StyledSearchData>
                ))}
              </StyledSearchContainer>}
          </StyledSearchResultContainer>
          <StyledInputContainer>
            <StyledField>주소</StyledField>
            <StyledInputAddress
              value={selectedAddressState.address}
              disabled
            />
          </StyledInputContainer>
          <StyledSubmitButtonWrapper>
            {
              isEdit
                ?
                <StyledSubmitButton name="edit" type="submit">수정</StyledSubmitButton>
                :
                <StyledSubmitButton name="add" type="submit">추가</StyledSubmitButton>
            }
          </StyledSubmitButtonWrapper>
        </StyledFormContainer>
      </form>
    </StyledModalForm >
  );
};

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
  placeholder: "제목 입력..."
})`
  width: 100%;
  font-size: 1.5rem;
  padding: 5px;
  border: none;
  &:focus{
    outline: none;
    background-color: white;
  }
`;

const StyledInputText = styled.textarea.attrs({
  placeholder: "글 입력..."
})`
  width: 100%;
  height: 100px;
  font-size: 1.5rem;
  padding: 5px;
  border: none;
  resize: none;
  overflow-y: scroll;
  &:focus{
    outline: none;
    background-color: white;
  }

`;

const StyledImgLabel = styled.label.attrs({
  htmlFor: "image"
})`
  padding-right: 6px;
  font-size: 3rem;
  cursor: pointer;
`;

const StyledInputImg = styled(StyledInputTitle).attrs({
  className: "login-input",
  type: "file",
  id: "image",
  accept: "image/*",
  multiple: true
})`
  display: none;
`;

const StyledSearchAddress = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledInputSearchAddress = styled.input.attrs({
  className: "login-input",
  type: "text",
  id: "searching",
  placeholder: '장소 검색...'
})`
  width: 100%;
  height: 34px;
  font-size: 1.5rem;
  border: none;
  &:focus{
    outline: none;
    background-color: white;
  }
`;

const StyledButtonSearchAddress = styled.button`
  border: none;
  background-color: white;
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
`;

const StyledSearchInfoHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.8rem;
`;

const StyledSearchInfoTitle = styled.span`
  font-weight: 500;
  cursor:pointer;
`;

const StyledFiExternalLink = styled.a.attrs({
  target: '_blank'
})`
  position: absolute;
  top : 15px;
  right: 15px;
  font-size: 1.8rem;
  cursor: pointer;
  color: #487eb0;
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
  placeholder: "검색 결과..."
})`
  width: 100%;
  height: 34px;
  font-size: 1.5rem;
  border: none;
  &:focus{
    outline: none;
    background-color: white;
  }

  &:disabled{
    background-color:white;
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
  background-color: white;
  font-size: 1.6rem;
  width: 30%;
  padding:10px 0;
  cursor: pointer;
  border-radius: 20px;
  transition: all 0.8s linear;
  &:hover{
    background-color: #00cec9;
  }
`;

export default Form;
