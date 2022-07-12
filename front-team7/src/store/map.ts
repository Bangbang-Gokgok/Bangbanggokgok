import { atom } from 'recoil';

interface MapAtom {
  mapSize: {
    width: string,
    height: string;
  };
  mapLevel: number;
  centerLatLng: {
    lat: number,
    lng: number;
  };
}

const mapDefaultState: MapAtom = {
  mapSize: {
    width: '100%',
    height: '100%'
  },
  mapLevel: 2,
  // Feed List의 첫 번째 location으로 변경해야함
  centerLatLng: {
    lat: 37.5666805,
    lng: 126.9784147
  }
};

const mapAtom = atom({
  key: 'map',
  default: mapDefaultState,
});

export { mapAtom };
