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
      description: '카카오 본사에 들렸읍니다.',
      address: '제주 제주시 첨단로 242',
      lat: 33.450705,
      lng: 126.570677,
      createAt: '2022-07-01'
    },
    {
      username: '김정',
      title: '근린공원이네요',
      description: '카카오 근린공원에 들렸읍니다.',
      address: '제주 제주시 첨단로 242',
      lat: 33.451393,
      lng: 126.570738,
      createAt: '2022-06-27'
    },
    {
      username: '제주도사람',
      title: '🌾 텃밭 방문해봤습니다.',
      description: '카카오 텃밭에 들렸읍니다.',
      address: '제주 제주시 첨단로 242',
      lat: 33.450936,
      lng: 126.569477,
      createAt: '2022-06-15'
    },
    {
      username: '그냥아저씨',
      title: '제주도 카카오',
      description: '아저씨가 카카오에',
      address: '제주 제주시 첨단로 242',
      lat: 33.450879,
      lng: 126.569940,
      createAt: '2022-06-10'
    },
    {
      username: '서울사람',
      title: '서울역 방문기',
      description: '서울역에 들렸읍니다.',
      address: '서울 특별시 서울역',
      lat: 37.55294316360036,
      lng: 126.97289588774116,
      createAt: '2022-05-25'
    }
  ];

  return (
    <Main header={true} footer={true}>
      <Map mapSize={mapSize} mapLevel={mapLevel} centerLatLng={centerLatLng} feedList={feedList} ></Map>
    </Main >
  );
};

export default MyMap;