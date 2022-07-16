import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ImRoad } from 'react-icons/im';
import { FaAddressBook, FaMapMarkedAlt, FaMousePointer, FaSave } from 'react-icons/fa';
import { MdPlace } from 'react-icons/md';
import * as Api from '@/api/feeds';
import * as UserApi from '@/api/users';
import { AiOutlineConsoleSql } from 'react-icons/ai';

const StyledFormContainer = styled.div`
  min-width: 300px;
  max-height: 500px;
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 50px 20px;
  background-color: rgb(235, 235, 235);
  overflow: scroll;
`;

const StyledTitle = styled.div`
  width: 100%;
  height: 60px;
  font-size: 1.5rem;
  background: pink;
`;
const StyledInputContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  // background: lightgreen;

  .submitBtn {
    font-size: 1.4rem;
    border-radius: 15px;
  }
`;
const StyledField = styled.div`
  width: 15%;
  height: 40px;
  line-height: 40px;
  font-size: 1.5rem;
`;

const StyledInput = styled.input`
  width: 85%;
  box-sizing: border-box;
  height: 40px;
  font-size: 1.5rem;
  padding-left: 10px;
  border-radius: 15px;

  // background-color: rgb(235, 235, 235);
`;

const StyledSearchContainer = styled.div`
  width: 100%;
  min-height: 200px;
  overflow-y: auto;

  // display: flex;
  // flex-direction: column;
  // gap: 30px;
  // background-color: red;
`;

const StyledSearchData = styled.div`
  width: 85%;
  height: 100px;
  line-height: 80px;
  padding: 15px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid gray;
  background-color: whitesmoke;
  // cursor: pointer;

  // :hover {
  //   border: 2px solid black;
  // }
`;

const StyledSearchInfoData = styled.div`
  display: flex;
  gap: 15px;
  height: 20px;
  line-height: 20px;

  // padding: 5px 8px;

  .placeName {
    font-weight: 600;
  }

  .roadAddressName,
  .addressName {
    font-size: 1.3rem;
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

interface PlaceListProps extends Array<PlaceProps> {}

interface CenterLatLng {
  lat: number;
  lng: number;
}

interface Review {
  userName: string;
  contents: string;
  timestamp: Date;
}

const Form = () => {
  const [placeInfoList, setPlaceInfoList] = useState<PlaceListProps>([]);
  const { register, watch, handleSubmit } = useForm();

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
  // <추가과제>
  // 빈 값을 넣고 엔터를 쳤을 때 axios Error 처리 하기
  // 성공적으로 값을 추가한 뒤 값을 초기화해서 빈 값으로 바꾸기
  // 여러 에러 발생 가능 => 에러 메세지 백엔드에서 구현되면, 프론트에서 보여주는 로직 추가하기 (useForm의 에러 처리 검색해보기)
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <StyledFormContainer>
        <StyledTitle>Feed 추가하기</StyledTitle>
        <StyledInputContainer>
          <StyledField>제목</StyledField>
          <StyledInput placeholder="title" {...register('title')}></StyledInput>
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledField>설명</StyledField>
          <StyledInput placeholder="description" {...register('description')}></StyledInput>
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledField>이미지</StyledField>
          <input className="login-input" type="file" id="image" multiple {...register('image')} />
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledField>주소</StyledField>
          <input className="login-input" type="text" id="searching" {...register('searching')} />
          <button
            onClick={(e) => {
              searchPlace(e);
            }}
          >
            검색
          </button>
        </StyledInputContainer>
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
                  <button type="submit">추가</button>
                </div>
              </StyledSearchInfoData>
            </StyledSearchData>
          ))}
        </StyledSearchContainer>
      </StyledFormContainer>
    </form>
  );
};

export default Form;
