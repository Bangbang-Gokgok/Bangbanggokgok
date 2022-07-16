import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ImRoad } from 'react-icons/im';
import { FaAddressBook, FaMapMarkedAlt, FaMousePointer, FaSave } from 'react-icons/fa';
import { MdPlace } from 'react-icons/md';
import * as Api from '@/api/feeds';
import { FaSearchLocation } from 'react-icons/fa';
import { FcAddImage, FcSearch } from 'react-icons/fc';
import { useRecoilValue } from 'recoil';
import { currentFeedAtom } from '@/store/currentFeed';
import * as UserApi from '@/api/users';


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
  height: 34px;
  font-size: 1.5rem;
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
  placeholder: '장소 입력...'
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
  margin-top: 10px;
`;

const StyledSearchData = styled.div`
  width: 80%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-radius: 20px;
  background-color: whitesmoke;
  box-shadow: 5px 5px 5px #c2c2c2;
  

`;

const StyledSearchInfoData = styled.div`
  display: flex;
  gap: 15px;
  height: 20px;
  line-height: 20px;

  // padding: 5px 8px;

  .placeName {
    font-weight: 500;
  }

  .roadAddressName,
  .addressName {
    font-size: 1rem;
    color: gray;
  }

  .map {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    gap: 15px;

    .map-icon {
      font-size: 1.6rem;
      cursor: pointer;
      :hover {
        color: red;
      }
    }
    .select-icon {
      font-size: 1.6rem;
      cursor: pointer;
      :hover {
        color: green;
      }
    }
  }
  .place-icon,
  .roadAddress-icon,
  .address-icon {
    font-size: 2rem;
    height: 20px;
  }
`;

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

interface PlaceListProps extends Array<PlaceProps> { }

const Form = ({ isEdit }: { isEdit: boolean; }) => {
  const [searchState, setSearchState] = useState(false);
  const [placeInfoList, setPlaceInfoList] = useState<PlaceListProps>([]);
  const currentFeedState = useRecoilValue(currentFeedAtom);
  const { register, watch, handleSubmit } = useForm();

  if (isEdit) console.log(currentFeedState);

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
    // console.log('조회해온 장소들 : ', places);
    setPlaceInfoList(places);
    setSearchState(true);
  };

  // Feed CREATE
  const submitForm = async (data) => {
    if (!confirm('Feed를 추가하시겠습니까?')) return;

    const { title, description, address, image, x, y, searching } = data;

    const myInfo = await UserApi.getMyUserInfo();
    const userName = myInfo.name;

    const dummy = {
      userName,
      title,
      description,
      address,
      location: {
        lat: Number(y),
        lng: Number(x),
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
  };

  const editSubmitForm = (data) => {
    console.log(data);

  };

  // <추가과제>
  // 빈 값을 넣고 엔터를 쳤을 때 axios Error 처리 하기
  // 성공적으로 값을 추가한 뒤 값을 초기화해서 빈 값으로 바꾸기
  // 여러 에러 발생 가능 => 에러 메세지 백엔드에서 구현되면, 프론트에서 보여주는 로직 추가하기 (useForm의 에러 처리 검색해보기)
  return (
    <StyledModalForm>
      <form onSubmit={isEdit ? handleSubmit(editSubmitForm) : handleSubmit(submitForm)}>
        <StyledFormContainer>
          <StyledTitle>
            <StyledTitleSpan>{isEdit ? '내 피드 수정하기' : '새로운 피드 만들기'}</StyledTitleSpan>
          </StyledTitle>
          <StyledInputContainer>
            <StyledField>제목</StyledField>
            <StyledInputTitle  {...register('title')}></StyledInputTitle>
          </StyledInputContainer>
          <StyledInputContainer>
            <StyledField>설명</StyledField>
            <StyledInputText {...register('description')}></StyledInputText>
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
                    <StyledSearchInfoData>
                      <MdPlace className="place-icon"></MdPlace>
                      <span className="placeName">{place.place_name}</span>
                    </StyledSearchInfoData>
                    <StyledSearchInfoData>
                      <ImRoad className="roadAddress-icon"></ImRoad>
                      <span className="roadAddressName">{place.road_address_name}</span>
                    </StyledSearchInfoData>
                    <StyledSearchInfoData>
                      <FaAddressBook className="address-icon"></FaAddressBook>
                      <span className="addressName">{place.address_name}</span>
                      <input
                        className="addressName"
                        type="hidden"
                        value={place.address_name}
                        {...register('address')}
                      />
                      <input className="x" type="hidden" value={place.x} {...register('x')} />
                      <input className="y" type="hidden" value={place.y} {...register('y')} />
                    </StyledSearchInfoData>
                    <StyledSearchInfoData>
                      <div className="map">
                        <FaMapMarkedAlt
                          className="map-icon"
                          onClick={() => {
                            window.open(place.place_url);
                          }}
                        ></FaMapMarkedAlt>
                        {
                          isEdit
                            ?
                            <button name="edit" type="submit">수정</button>
                            :
                            <button name="add" type="submit">추가</button>
                        }
                      </div>
                    </StyledSearchInfoData>
                  </StyledSearchData>
                ))}
              </StyledSearchContainer>}
          </StyledSearchResultContainer>
          <StyledInputContainer>
            <StyledField>장소</StyledField>
            <StyledInputText {...register('description')}></StyledInputText>
          </StyledInputContainer>
        </StyledFormContainer>
      </form>
    </StyledModalForm>
  );
};

export default Form;
