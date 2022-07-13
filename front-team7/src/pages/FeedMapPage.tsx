import { FeedHeader } from "@/components/FeedHeader";
import { Main } from "@/components/Layout";
import Map from "@/components/Map/Map";
import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { mapAtom } from "@/store/map";
import ModalFrame from "@/components/Layout/ModalFrame/ModalFrame";
import FeedDetail from "@/components/Layout/FeedDetail/FeedDetail";
import { feedModalAtom } from "@/store/feedModal";

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
  createdAt: string,
  updatedAt: string;
}

interface FeedDetail {
  userName: string;
  title: string;
  description: string;
  review: Array<Review>;
  address: string;
  createdAt: string,
  updatedAt: string;
}

interface FeedListProps extends Array<FeedProps> { }

const FeedMapPage = () => {

  const { userId } = useParams();
  const [feedList, setFeedList] = useState<FeedListProps>([]);
  const [_mapValue, setMapValue] = useRecoilState(mapAtom);
  const [stateModal, setStateModal] = useState(false);
  const [feedModalState, setFeedModalState] = useRecoilState(feedModalAtom);

  useEffect(() => {
    // userId를 사용한 API Call -> feedList를 useState로 관리
    const result = [
      {
        _id: '62cbebe2ab0326b696cbe421',
        userName: '김정현',
        title: '👍🏽 카카오에 방문해봤습니다.',
        description: '카카오 본사에 들렸읍니다.',
        address: '제주 제주시 첨단로 242',
        location: {
          lat: 33.450705,
          lng: 126.570677
        },
        "review": [],
        "createdAt": "2022-07-11T09:21:26.597Z",
        "updatedAt": "2022-07-11T09:21:26.597Z",
      },
      {
        _id: '62cbebe2ab0326b696cbe422',
        userName: '김정',
        title: '근린공원이네요',
        description: '카카오 근린공원에 들렸읍니다.',
        address: '제주 제주시 첨단로 242',
        location: {
          lat: 33.451393,
          lng: 126.570738
        },
        "review": [],
        "createdAt": "2022-07-11T09:21:26.597Z",
        "updatedAt": "2022-07-11T09:21:26.597Z",
      },
      {
        "_id": "62cbeb96ab0326b696cbe41c",
        "userName": "제주도사람",
        "title": "🌾 텃밭 방문해봤습니다.",
        "description": "카카오 텃밭에 들렸읍니다.",
        "address": "제주 제주시 첨단로 242",
        "location": {
          "lat": 33.450936,
          "lng": 126.569477
        },
        "review": [],
        "createdAt": "2022-07-11T09:21:26.597Z",
        "updatedAt": "2022-07-11T09:21:26.597Z",
      },
      {
        _id: '62cbebe2ab0326b696cbe423',
        userName: '그냥아저씨',
        title: '제주도 카카오',
        description: '아저씨가 카카오에',
        address: '제주 제주시 첨단로 242',
        location: {
          lat: 33.450879,
          lng: 126.569940
        },
        "review": [],
        "createdAt": "2022-07-11T09:21:26.597Z",
        "updatedAt": "2022-07-11T09:21:26.597Z",
      },
      {
        _id: '62cbebe2ab0326b696cbe420',
        userName: '서울사람',
        title: '서울역 방문기',
        description: '서울역에 들렸읍니다.',
        address: '서울 특별시 서울역',
        location: {
          lat: 37.55294316360036,
          lng: 126.97289588774116
        },
        "review": [],
        "createdAt": "2022-07-11T09:21:26.597Z",
        "updatedAt": "2022-07-11T09:21:26.597Z",
      }
      ,
      {
        _id: '62cbebe2ab0326b696cbe420',
        userName: '서울사람',
        title: '서울역 방문기',
        description: '서울역에 들렸읍니다.',
        address: '서울 특별시 서울역',
        location: {
          lat: 37.55294316360036,
          lng: 126.97289588774116
        },
        "review": [],
        "createdAt": "2022-07-11T09:21:26.597Z",
        "updatedAt": "2022-07-11T09:21:26.597Z",
      }
      ,
      {
        _id: '62cbebe2ab0326b696cbe420',
        userName: '서울사람',
        title: '서울역 방문기',
        description: '서울역에 들렸읍니다.',
        address: '서울 특별시 서울역',
        location: {
          lat: 37.55294316360036,
          lng: 126.97289588774116
        },
        "review": [],
        "createdAt": "2022-07-11T09:21:26.597Z",
        "updatedAt": "2022-07-11T09:21:26.597Z",
      }
      ,
      {
        _id: '62cbebe2ab0326b696cbe420',
        userName: '서울사람',
        title: '서울역 방문기',
        description: '서울역에 들렸읍니다.',
        address: '서울 특별시 서울역',
        location: {
          lat: 37.55294316360036,
          lng: 126.97289588774116
        },
        "review": [],
        "createdAt": "2022-07-11T09:21:26.597Z",
        "updatedAt": "2022-07-11T09:21:26.597Z",
      }
      ,
      {
        _id: '62cbebe2ab0326b696cbe420',
        userName: '서울사람',
        title: '서울역 방문기',
        description: '서울역에 들렸읍니다.',
        address: '서울 특별시 서울역',
        location: {
          lat: 37.55294316360036,
          lng: 126.97289588774116
        },
        "review": [],
        "createdAt": "2022-07-11T09:21:26.597Z",
        "updatedAt": "2022-07-11T09:21:26.597Z",
      }
      ,
      {
        _id: '62cbebe2ab0326b696cbe420',
        userName: '서울사람',
        title: '서울역 방문기',
        description: '서울역에 들렸읍니다.',
        address: '서울 특별시 서울역',
        location: {
          lat: 37.55294316360036,
          lng: 126.97289588774116
        },
        "review": [],
        "createdAt": "2022-07-11T09:21:26.597Z",
        "updatedAt": "2022-07-11T09:21:26.597Z",
      }
      ,
      {
        _id: '62cbebe2ab0326b696cbe420',
        userName: '서울사람',
        title: '서울역 방문기',
        description: '서울역에 들렸읍니다.',
        address: '서울 특별시 서울역',
        location: {
          lat: 37.55294316360036,
          lng: 126.97289588774116
        },
        "review": [],
        "createdAt": "2022-07-11T09:21:26.597Z",
        "updatedAt": "2022-07-11T09:21:26.597Z",
      }
      ,
      {
        _id: '62cbebe2ab0326b696cbe420',
        userName: '서울사람',
        title: '서울역 방문기',
        description: '서울역에 들렸읍니다.',
        address: '서울 특별시 서울역',
        location: {
          lat: 37.55294316360036,
          lng: 126.97289588774116
        },
        "review": [],
        "createdAt": "2022-07-11T09:21:26.597Z",
        "updatedAt": "2022-07-11T09:21:26.597Z",
      }
      ,
      {
        _id: '62cbebe2ab0326b696cbe420',
        userName: '서울사람',
        title: '서울역 방문기',
        description: '서울역에 들렸읍니다.',
        address: '서울 특별시 서울역',
        location: {
          lat: 37.55294316360036,
          lng: 126.97289588774116
        },
        "review": [],
        "createdAt": "2022-07-11T09:21:26.597Z",
        "updatedAt": "2022-07-11T09:21:26.597Z",
      }
    ];

    setFeedList(result);
    if (result.length > 0) {
      setMapValue((currMapValue) => ({
        ...currMapValue,
        centerLatLng: {
          lat: result[0].location.lat,
          lng: result[0].location.lng
        },
      }));
    }

  }, []);



  const onClickModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event);
    console.log('click');
  };

  const onClickMapFeed = (item: FeedProps) => {
    const { userName, title, description, address, location, review, createdAt } = item;
    changeCenterLatLng(location);
    setFeedModalState((prev) => ({
      ...prev,
      userName,
      title,
      description,
      address,
      review,
      createdAt
    }));
    toggleModal();
  };

  const changeCenterLatLng = (newCenterLatLng: CenterLatLng) => {
    setMapValue((currMapValue) => ({
      ...currMapValue,
      centerLatLng: {
        lat: newCenterLatLng.lat,
        lng: newCenterLatLng.lng
      },
      mapLevel: 1
    }));
  };

  const toggleModal = () => {
    setStateModal((prev) => !prev);
  };


  return (
    <Main>
      <StyledWrapper>
        <Map feedList={feedList} toggleModal={onClickMapFeed} ></Map>
        <Button onClick={onClickModal}>
          <BsPlus />
        </Button>
        <StyledFeeds>
          {feedList.map((item, idx) => (
            <FeedHeader
              onClickHandler={() => onClickMapFeed(item)}
              isFolded={true}
              key={idx}
              name={item.userName}
              title={item.title}
            />
          ))}
        </StyledFeeds>
      </StyledWrapper>
      <ModalFrame handleModal={toggleModal} state={stateModal}>
        <FeedDetail isModal={true} name={feedModalState.userName} title={feedModalState.title} desc={feedModalState.description}></FeedDetail>
      </ModalFrame>
    </Main >
  );
};

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  position: absolute;
  z-index: 4;
  bottom: 160px;
  right: 5%;
  margin-bottom: 5px;
  font-size: 4.5rem;
  width: 56px;
  height: 56px;
  border: none;
  background-color: #00cec9;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;

  @media only screen and (min-width: 768px) {
    bottom: 5%;
    width: 70px;
    height: 70px;
    font-size: 7rem;
  }

  @media only screen and (min-width: 1024px) {
    bottom: 5%;
    width: 80px;
    height: 80px;
    font-size: 8rem;
  }
`;

const StyledFeeds = styled.div`
  position: absolute;
  max-height: 160px;
  width: 90%;
  z-index: 3;
  bottom: 0;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  gap: 5px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  @media only screen and (min-width: 768px) {
    width: 350px;
    height: 100%;
    max-height: 68%;
    right: 2%;
    top: 2%;
  }

  @media only screen and (min-width: 1024px) {
    width: 400px;
  }

`;

export default FeedMapPage;