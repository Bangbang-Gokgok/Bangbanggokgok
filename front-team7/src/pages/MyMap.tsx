import { Main } from "@/components/Layout";
import Map from "@/components/Map/Map";
import { useState } from "react";

const MyMap = () => {
  const mapSize = {
    width: '100%',
    height: '100%'
  };

  const mapLevel = 2;

  const centerLatLng = {
    lat: 33.450705,
    lng: 126.570677
  };

  const feedList = [
    {
      username: '김정현',
      title: '👍🏽 카카오에 방문해봤습니다.',
      lat: 33.450705,
      lng: 126.570677
    },
    {
      username: '김정',
      title: '근린공원이네요',
      lat: 33.451393,
      lng: 126.570738
    },
    {
      username: '제주도사람',
      title: '🌾 텃밭 방문해봤습니다.',
      lat: 33.450936,
      lng: 126.569477
    },
    {
      username: '그냥아저씨',
      title: '제주도 카카오',
      lat: 33.450879,
      lng: 126.569940
    },
  ];

  return (
    <Main header={true} footer={true}>
      <Map mapSize={mapSize} mapLevel={mapLevel} centerLatLng={centerLatLng} feedList={feedList} ></Map>
    </Main >
  );
};

export default MyMap;