/*global kakao*/
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import pinImg from '@/assets/images/general-marker.png';
import centerPinImg from '@/assets/images/point-marker.png';
import { useRecoilValue } from "recoil";
import { mapAtom } from "@/store/map";
import { FeedListProps, FeedProps } from '@/types/feed';

declare global {
  interface Window {
    kakao: any;
  }
}
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
  const [mapMarkers, setMapMarkers] = useState<Object[]>([]);
  const [mapClusterer, setMapCluesterer] = useState<any>();
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
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    setMapState(map);
  };

  const addMarkerToMap = (map) => {
    const clusterer = new kakao.maps.MarkerClusterer({
      map: map,
      averageCenter: true,
      minLevel: 8,
    });

    const positions = feedList.map((feed) => ({
      content: makePositionsContent(feed),
      latlng: new kakao.maps.LatLng(feed.location.lat, feed.location.lng),
      item: feed,
    }));

    const imageSize = new kakao.maps.Size(50, 50);

    const centerMarkerImage = new kakao.maps.MarkerImage(centerPinImg, imageSize);

    const markerImage = new kakao.maps.MarkerImage(pinImg, imageSize);

    const markers = positions.map((position) => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: position.latlng,
        image:
          mapValue.centerLatLng.lat === position.latlng.Ma &&
            mapValue.centerLatLng.lng === position.latlng.La
            ? centerMarkerImage
            : markerImage,
      });

      const customOverlay = new kakao.maps.CustomOverlay({
        position: position.latlng,
        content: position.content,
        yAnchor: 1.6,
      });

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

    function makeOverListener(customOverlay) {
      return function () {
        customOverlay.setMap(map);
      };
    }

    clusterer.addMarkers(markers);

    kakao.maps.event.addListener(clusterer, 'clusterclick', function (cluster) {
      const level = map.getLevel() - 3;
      map.setLevel(level, { anchor: cluster.getCenter() });
    });

    setMapMarkers(markers);
    setMapCluesterer(clusterer);
  };

  function panTo(map, location) {
    if (!map) return;

    const moveLatLon = new kakao.maps.LatLng(location.lat, location.lng);
    map.panTo(moveLatLon);
  }

  const removeMarkerCluster = (markers) => {
    if (markers.length === 0 || mapClusterer === undefined) return;
    markers.forEach(marker => marker.setMap(null));

    mapClusterer.clear();
  };

  useEffect(() => {
    drawMap();
  }, []);

  useEffect(() => {
    removeMarkerCluster(mapMarkers);
    addMarkerToMap(mapState);
  }, [feedList, mapValue]);

  useEffect(() => {
    panTo(mapState, mapValue.centerLatLng);
  }, [mapValue]);

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
