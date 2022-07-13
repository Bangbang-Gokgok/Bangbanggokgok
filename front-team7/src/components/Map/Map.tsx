/*global kakao*/
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import pinImg from '@/assets/images/blue-pin.png';
import centerPinImg from '@/assets/images/red-pin.png';
import { useRecoilValue, useRecoilState } from "recoil";
import { mapAtom } from "@/store/map";
import { feedModalAtom } from '@/store/feedModal';

declare global {
  interface Window {
    kakao?: any;
  }
}

interface MapContainer {
  width: string;
  height: string;
}

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

interface FeedListProps extends Array<FeedProps> { }

const { kakao } = window;

const Map = ({ feedList, toggleModal }: { feedList: FeedListProps, toggleModal: () => void; }) => {
  const mapValue = useRecoilValue(mapAtom);
  const [_, setMapValue] = useRecoilState(mapAtom);
  const [feedModalState, setFeedModalState] = useRecoilState(feedModalAtom);
  const mapContainer = useRef<HTMLDivElement>(null);

  const drawMap = () => {
    const options: Object = {
      center: new kakao.maps.LatLng(mapValue.centerLatLng.lat, mapValue.centerLatLng.lng),
      level: mapValue.mapLevel,
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
      minLevel: 8, // 클러스터 할 최소 지도 레벨
    });

    // --------------
    // | 마커 생성    |
    // --------------

    // 마커를 표시할 위치와 title 객체 배열입니다
    const positions = feedList.map((feed) => ({
      content: `
      <div style="display: flex; flex-direction: column; background-color:white; border: 1px solid white; border-radius:10px; padding:5px; box-shadow: 3px 3px 3px grey;">
        <span style="font-size: 18px; font-weight: bold;">${feed.title}</span>
        <span style="font-size: 12px; color:blue">${feed.address}</span>
      </div>
      `,
      latlng: new kakao.maps.LatLng(feed.location.lat, feed.location.lng),
      item: feed,
    }));

    // 마커 이미지 크기
    const imageSize = new kakao.maps.Size(24, 35);

    // 센터 마커 이미지를 생성합니다
    const centerMarkerImage = new kakao.maps.MarkerImage(centerPinImg, imageSize);
    // 일반 마커 이미지를 생성합니다
    const markerImage = new kakao.maps.MarkerImage(pinImg, imageSize);

    const markers = positions.map((position, idx) => {
      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: position.latlng, // 마커의 위치
        image:
          mapValue.centerLatLng.lat === position.latlng.Ma && mapValue.centerLatLng.lng === position.latlng.La
            ? centerMarkerImage
            : markerImage,
      });

      // 마커에 표시할 커스텀 오버레이를 생성합니다
      const customOverlay = new kakao.maps.CustomOverlay({
        position: position.latlng,
        content: position.content, // 커스텀 오버레이에 표시할 내용
        yAnchor: 1.8,
      });

      // 마커에 mouseover 이벤트와 mouseout 이벤트, click 이벤트를 등록합니다
      // 이벤트 리스너로는 클로저를 만들어 등록합니다
      kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(customOverlay));
      kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(customOverlay));
      kakao.maps.event.addListener(marker, 'click', makeClickListener(position.item, customOverlay));
      return marker;
    });

    function makeClickListener(item, customOverlay) {
      const { userName, title, description, address, location, review, createdAt } = item;
      return function () {
        console.log(customOverlay, '클릭됐습니다.');
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
    kakao.maps.event.addListener(clusterer, 'clusterclick', function (cluster) {

      // 현재 지도 레벨에서 1레벨 확대한 레벨
      var level = map.getLevel() - 3;

      // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
      map.setLevel(level, { anchor: cluster.getCenter() });
    });
  };



  useEffect(() => {
    drawMap();
    console.log('side Effect');
    return () => {
      console.log('컴포넌트가 화면에서 사라짐');
    };
  }, [mapValue, feedList]);

  return (

    <StyledMapContainer
      width={mapValue.mapSize.width}
      height={mapValue.mapSize.height}
      ref={mapContainer}
    ></StyledMapContainer>

  );
};

const StyledMapContainer = styled.div<MapContainer>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 10px;
`;



export default Map;
