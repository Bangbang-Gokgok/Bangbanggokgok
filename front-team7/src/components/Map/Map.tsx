/*global kakao*/
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { FeedFolded } from "../FeedFolded";

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
  lat: Number,
  lng: Number,
}

interface IMarkingPostion {
  content: any,
  latlng: any,
}

const { kakao } = window;

const Map = ({ mapSize, mapLevel, centerLatLng }: { mapSize: IMapSize, mapLevel: number, centerLatLng: ICenterLatLng, }) => {


  const mapContainer = useRef<HTMLDivElement>(null);

  const drawMap = (): void => {
    const options: Object = {
      center: new kakao.maps.LatLng(centerLatLng.lat, centerLatLng.lng),
      level: mapLevel
    };
    const map = new kakao.maps.Map(mapContainer.current, options);

    // --------------
    // |지도 컨트롤러  |
    // --------------
    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);


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

    positions.forEach(position => {
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
  }, []);

  const feedList = [
    {
      username: '김정현',
      title: '👍🏽 카카오에 방문해봤습니다.'
    },
    {
      username: '김정',
      title: '근린공원이네요'
    },
    {
      username: '제주도사람',
      title: '🌾 텃밭 방문해봤습니다.'
    },
  ];

  return (
    <Wrapper>
      <MapContainer width={mapSize.width} height={mapSize.height} ref={mapContainer}></MapContainer>
      <Feeds>
        {feedList.map(item => (
          <FeedFolded name={item.username} title={item.title}></FeedFolded>
        ))}
      </Feeds>
    </Wrapper>
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
  height: calc(100% - 150px);
`;

const Feeds = styled.div`
  position: absolute;
  width: 100%;
  z-index: 1000;
  bottom: 0;
`;

export default Map;