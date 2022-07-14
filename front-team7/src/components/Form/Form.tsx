import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ImRoad } from 'react-icons/im';
import { FaAddressBook, FaMapMarkedAlt, FaMousePointer, FaSave } from 'react-icons/fa';
import { MdPlace } from 'react-icons/md';
import * as Api from '@/api/feeds';
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

interface FeedProps {
  _id: string;
  userName: string;
  title: string;
  description: string;
  review: Array<Review>;
  address: string;
  location: CenterLatLng;
  createdAt: string;
  updatedAt: string;
}

interface FeedListProps extends Array<FeedProps> {}

const Form = () => {
  // const [feedList, setFeedList] = useState<FeedListProps>([]);

  const [placeInfoList, setPlaceInfoList] = useState<PlaceListProps>([]);
  const { register, watch, handleSubmit } = useForm();

  const searchPlace = async (e) => {
    e.preventDefault();
    const inputPlace = watch().searching;
    // console.log('inputPlace : ', inputPlace);
    // console.log('process.env.KAKAO_SEARCH_REST_API_KEY : ', process.env.KAKAO_SEARCH_REST_API_KEY);
    // const searching = '합정 스타벅스';

    const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${inputPlace}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_SEARCH_REST_API_KEY}`,
      },
    });
    // console.log(res);

    const places: PlaceListProps = res.data.documents;
    console.log('places : ', places);
    setPlaceInfoList(places);
  };

  const submitForm = async (data) => {
    console.log('data : ', data);
    // e.preventDefault();
    // let title = watch().title;
    // let description = watch().description;
    // console.log('watch : ', watch());
    // let location = { x, y };

    // const sendData = { title, description, address, x, y };
    // createFormData(sendData);
    // alert('Feed create 완료되었습니다.');
    // console.log('data : ', data);
    const { title, description, address, image, location, searching } = data;

    const dummy = {
      title,
      description,
      address,

      imageUrl: image[0],
      location: {
        lat: Number(y),
        lng: Number(x),
      },
      // x: Number(x),
      // y: Number(y),
    };

    const fd = new FormData();

    fd.append('title', dummy.title);
    fd.append('description', dummy.description);
    fd.append('address', dummy.address);
    fd.append('location', dummy.location);
    fd.append('imageUrl', dummy.imageUrl);

    try {
      let res = await axios.post(`/api/feeds`, fd);
      console.log('create Feed : ', res);
    } catch (err) {
      console.log(err);
    }
  };

  async function createFormData(sendData) {
    console.log('sendData : ', sendData);
    const result: FeedListProps = await Api.createOneFeed(sendData);
    console.log('create Feed : ', result);
  }

  const postFormData = (address, x, y) => {
    let title = watch().title;
    let description = watch().description;
    let addressName = address;
    let location = { x, y };

    const sendData = { title, description, address: addressName, location };
    createFormData(sendData);
    alert('Feed create 완료되었습니다.');

    // image도 추가하고, create 성공 이후에 입력칸 전부 비우는 코드 필요
  };

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
          <input className="login-input" type="file" id="image" {...register('image')} />
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
          {/* <StyledInput search placeholder="place" {...register('place')}></StyledInput>
          <button
            className="submitBtn"
            onClick={(e) => {
              searchPlace(e);
            }}
          >
            제출
          </button> */}
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
                <input
                  className="addressName"
                  value={place.address_name}
                  {...register('address')}
                />

                <input className="x" value={place.x} {...register('x')} />
                <input className="y" value={place.y} {...register('y')} />
              </StyledSearchInfoData>
              <StyledSearchInfoData>
                <div className="map">
                  <FaMapMarkedAlt
                    className="map-icon"
                    onClick={() => {
                      window.open(place.place_url);
                    }}
                  ></FaMapMarkedAlt>
                  <button type="submit">
                    추가
                    {/* <FaSave
                      className="select-icon"
                      onClick={() => {
                        if (confirm('Feed를 추가하시겠습니까?')) {
                          postFormData(place.address_name, Number(place.x), Number(place.y));
                        }
                      }}
                    ></FaSave> */}
                  </button>
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
