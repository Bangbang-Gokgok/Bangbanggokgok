/*global kakao*/
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import pinImg from '@/assets/images/general-marker.png';
import centerPinImg from '@/assets/images/point-marker.png';
import { useRecoilValue } from "recoil";
import { mapAtom } from "@/store/map";
import { FeedListProps, FeedProps } from '@/types/feed';

interface MapContainer {
  width: string;
  height: string;
}

const { kakao } = window;

const Map = ({
  feedList,
  toggleModal,
}: {
  feedList: FeedListProps;
  toggleModal: (item: FeedProps) => void;
}) => {
  const mapValue = useRecoilValue(mapAtom);
  const [mapState, setMapState] = useState(null);
  const mapContainer = useRef<HTMLDivElement>(null);

  const makePositionsContent = (feed: FeedProps) => {
    const content = document.createElement('div');
    content.style.cssText =
      'display: flex; flex-direction: column; background-color:white; gap:3px; border: 1px solid white; border-radius:10px; padding:10px; box-shadow: 3px 3px 3px grey;';
    const title = document.createElement('span');
    title.style.cssText = 'font-size: 16px; font-weight: bold; cursor: pointer;';
    title.innerHTML = feed.title;

    const address = document.createElement('span');
    address.style.cssText = 'font-size: 8px; color:blue;';
    address.innerHTML = feed.address;

    // const reviewLength = document.createElement('span');
    // reviewLength.style.cssText = 'font-size: 4px;';
    // reviewLength.innerHTML = `${feed.review?.length}개의 리뷰`;

    const closeButton = document.createElement('button');
    closeButton.className = 'close-btn';
    closeButton.style.cssText =
      'font-size: 12px; cursor: pointer; border: none; border-radius: 10px; font-weight: 400; text-align: center; padding:3px';
    closeButton.innerHTML = '닫기';

    title.addEventListener('click', () => toggleModal(feed));

    content.appendChild(title);
    content.appendChild(address);
    // content.appendChild(reviewLength);
    content.appendChild(closeButton);

    return content;
  };

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
      content: makePositionsContent(feed),
      latlng: new kakao.maps.LatLng(feed.location.lat, feed.location.lng),
      item: feed,
    }));

    // 마커 이미지 크기
    const imageSize = new kakao.maps.Size(50, 50);

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
          mapValue.centerLatLng.lat === position.latlng.Ma &&
            mapValue.centerLatLng.lng === position.latlng.La
            ? centerMarkerImage
            : markerImage,
      });

      // 마커에 표시할 커스텀 오버레이를 생성합니다
      const customOverlay = new kakao.maps.CustomOverlay({
        position: position.latlng,
        content: position.content, // 커스텀 오버레이에 표시할 내용
        yAnchor: 1.6,
      });
      // 마커에 mouseover 이벤트와 mouseout 이벤트, click 이벤트를 등록합니다
      // 이벤트 리스너로는 클로저를 만들어 등록합니다
      kakao.maps.event.addListener(marker, 'click', makeOverListener(customOverlay));
      position.content
        .querySelector('.close-btn')
        ?.addEventListener('click', closeOverlay(customOverlay));
      return marker;
    });

    function closeOverlay(customOverlay) {
      return function () {
        customOverlay.setMap(null);
      };
    }

    // 커스텀 오버레이를 표시하는 클로저를 만드는 함수입니다
    function makeOverListener(customOverlay) {
      return function () {
        customOverlay.setMap(map);
      };
    }

    clusterer.addMarkers(markers);
    kakao.maps.event.addListener(clusterer, 'clusterclick', function (cluster) {
      // 현재 지도 레벨에서 1레벨 확대한 레벨
      const level = map.getLevel() - 3;

      // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
      map.setLevel(level, { anchor: cluster.getCenter() });
    });

    setMapState(map);
  };

  function panTo(map, location) {
    if (!map) return;

    // 이동할 위도 경도 위치를 생성합니다
    const moveLatLon = new kakao.maps.LatLng(location.lat, location.lng);

    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);
  }

  useEffect(() => {
    drawMap();
    panTo(mapState, mapValue.centerLatLng);
    console.log('Side Effect');

  }, [feedList, mapValue]);

  // useEffect(() => {

  // }, [mapValue]);

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
