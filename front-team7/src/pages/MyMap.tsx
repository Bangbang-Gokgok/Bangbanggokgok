import { Main } from "@/components/Layout";
import Map from "@/components/Map/Map";
import { useState } from "react";

const MyMap = () => {
  const [mapSize, setMapSize] = useState({
    width: '100%',
    height: '500px'
  });

  const [mapLevel, setMapLevel] = useState(3);

  const [centerLatLng, setCenterLatLng] = useState({
    lat: 33.450701,
    lng: 126.570667
  });

  return (
    <Main header={true} footer={true}>
      <Map mapSize={mapSize} mapLevel={mapLevel} centerLatLng={centerLatLng} ></Map>
    </Main >
  );
};

export default MyMap;