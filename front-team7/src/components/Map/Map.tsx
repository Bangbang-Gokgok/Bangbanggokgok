/*global kakao*/
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FeedFolded } from "../FeedFolded";
import { HiOutlinePlusCircle } from 'react-icons/hi';
declare global {
  interface Window {
    kakao?: any,
  }
}

interface IMapSize {
  width: string,
  height: string,
}

interface IMapContainer {
  width: string,
  height: string,
}

interface ICenterLatLng {
  lat: number,
  lng: number,
}

interface IFeed {
  username: string,
  title: string,
  lat: number,
  lng: number;
}

interface IFeedList extends Array<IFeed> { }

const { kakao } = window;

const Map = ({ mapSize, mapLevel, centerLatLng, feedList }: { mapSize: IMapSize, mapLevel: number, centerLatLng: ICenterLatLng, feedList: IFeedList; }) => {

  const [centerLat, setCenterLat] = useState(centerLatLng.lat);
  const [centerLng, setCenterLng] = useState(centerLatLng.lng);
  const [level, setLevel] = useState(mapLevel);

  const mapContainer = useRef<HTMLDivElement>(null);

  const drawMap = (): void => {
    const options: Object = {
      center: new kakao.maps.LatLng(centerLat, centerLng),
      level: level
    };
    const map = new kakao.maps.Map(mapContainer.current, options);

    // --------------
    // |지도 컨트롤러  |
    // --------------
    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 마커 클러스터러를 생성합니다 
    const clusterer = new kakao.maps.MarkerClusterer({
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
      minLevel: 8 // 클러스터 할 최소 지도 레벨 
    });


    // --------------
    // | 마커 생성    |
    // --------------
    // 마커를 표시할 위치와 title 객체 배열입니다 
    const positions = [
      {
        content: `
        <div style="display: flex; flex-direction: column; background-color:white; border: 1px solid white; border-radius:10px; padding:5px; box-shadow: 3px 3px 3px grey;">
          <span style="font-size: 18px; font-weight: bold;">👍🏽 카카오에 방문해봤습니다.</span>
          <span style="font-size: 12px; color:blue">제주 제주시 첨단로 242</span>
        </div>
        `,
        latlng: new kakao.maps.LatLng(33.450705, 126.570677),
      },
      {
        content: `
        <div style="display: flex; flex-direction: column; background-color:white; border: 1px solid white; border-radius:10px; padding:5px; box-shadow: 3px 3px 3px grey;">
          <span style="font-size: 18px; font-weight: bold;">🌾 텃밭 방문해봤습니다.</span>
          <span style="font-size: 12px; color:blue">제주 제주시 첨단로 242-2</span>
        </div>
        `,
        latlng: new kakao.maps.LatLng(33.450936, 126.569477)
      },
      {
        content: `
        <div style="display: flex; flex-direction: column; background-color:white; border: 1px solid white; border-radius:10px; padding:5px; box-shadow: 3px 3px 3px grey;">
          <span style="font-size: 18px; font-weight: bold;">연못 낚시터</span>
          <span style="font-size: 12px; color:blue">제주 제주시 첨단로 242-3</span>
        </div>
        `,
        latlng: new kakao.maps.LatLng(33.450879, 126.569940)
      },
      {
        content: `
        <div style="display: flex; flex-direction: column; background-color:white; border: 1px solid white; border-radius:10px; padding:5px; box-shadow: 3px 3px 3px grey;">
          <span style="font-size: 18px; font-weight: bold;">근린공원이네요</span>
          <span style="font-size: 12px; color:blue">제주 제주시 첨단로 242</span>
        </div>
        `,
        latlng: new kakao.maps.LatLng(33.451393, 126.570738)
      }
    ];

    const markers = positions.map(position => {
      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: position.latlng // 마커의 위치
      });

      // 마커에 표시할 커스텀 오버레이를 생성합니다 
      const customOverlay = new kakao.maps.CustomOverlay({
        position: position.latlng,
        content: position.content, // 커스텀 오버레이에 표시할 내용
        yAnchor: 1.8
      });

      // 마커에 mouseover 이벤트와 mouseout 이벤트, click 이벤트를 등록합니다
      // 이벤트 리스너로는 클로저를 만들어 등록합니다
      kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(customOverlay));
      kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(customOverlay));
      kakao.maps.event.addListener(marker, 'click', makeClickListener(customOverlay));
      return marker;
    });

    function makeClickListener(customOverlay) {
      return function () {
        console.log(customOverlay, "클릭됐습니다.");
      };

    }

    // 커스텀 오버레이를 표시하는 클로저를 만드는 함수입니다 
    function makeOverListener(customOverlay) {
      return function () {
        customOverlay.setMap(map);
      };
    }

    // 커스텀 오버레이를 닫는 클로저를 만드는 함수입니다 
    function makeOutListener(customOverlay) {
      return function () {
        customOverlay.setMap(null);
      };
    }
    clusterer.addMarkers(markers);
    // --------------
    // | 주소 기반 탐색 |
    // --------------
    //   const geocoder = new kakao.maps.services.Geocoder();

    //   geocoder.addressSearch('서울특별시 용산구 녹사평대로 150', (result, status) => {

    //     // 정상적으로 검색이 완료됐으면 
    //     if (status === kakao.maps.services.Status.OK) {
    //       console.log(result[0].y, result[0].x);

    //       const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
    //       // 결과값으로 받은 위치를 마커로 표시합니다
    //       const marker = new kakao.maps.Marker({
    //         map: map,
    //         position: coords
    //       });
    //       console.log(coords);
    //       // 커스텀 오버레이로 장소에 대한 설명을 표시합니다
    //       const infowindow = new kakao.maps.InfoWindow({
    //         content: `<div style="width:150px;text-align:center;padding:6px 0;">용산구청</div>`
    //       });
    //       infowindow.open(map, marker);

    //       // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
    //       map.setCenter(coords);
    //     } else {
    //       console.log(result); // []
    //       console.log(status); // ZERO_RESULT
    //     }
    //   });
  };

  useEffect(() => {
    drawMap();
    console.log('side Effect');

  }, [centerLat, centerLng, mapLevel]);

  const onClickModal = () => {
    console.log('click');
  };

  const onClickMapFeed = (lat: number, lng: number) => {
    changeCenterLatLng(lat, lng);
    unfoldFeed();
  };

  const changeCenterLatLng = (lat: number, lng: number) => {
    setCenterLat(lat);
    setCenterLng(lng);
    setLevel(1);
  };

  const unfoldFeed = () => {
    console.log('피드 펼치기');

  };

  return (
    <Wrapper>
      <MapContainer width={mapSize.width} height={mapSize.height} ref={mapContainer}></MapContainer>
      <Button onClick={onClickModal}><HiOutlinePlusCircle /></Button>
      <Feeds >
        {feedList.map((item, idx) => (
          <FeedFolded handler={() => onClickMapFeed(item.lat, item.lng)} key={idx} name={item.username} title={item.title}></FeedFolded>
        ))}
      </Feeds>
    </Wrapper >
  );
};

const MapContainer = styled.div<IMapContainer>`
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 10px;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 70px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  position: absolute;
  z-index: 4;
  bottom: 20%;
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
`;

const Feeds = styled.div`
  position: absolute;
  max-height: 20%;
  width: 90%;
  z-index: 3;
  bottom: 0;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;


export default Map;