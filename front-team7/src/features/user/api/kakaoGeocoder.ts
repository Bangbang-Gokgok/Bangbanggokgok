interface LocationState {
  lat: number;
  lng: number;
}

export const useKakaoGeocoder = () => {
  const geocoder = new kakao.maps.services.Geocoder();

  function getLocation(address?: string): Promise<LocationState> {
    return new Promise((resolve, reject) => {
      geocoder.addressSearch(address!, (result, status) => {
        console.log(result);
        if (status === kakao.maps.services.Status.OK) {
          const { x, y } = result[0];

          resolve({ lat: Number(x), lng: Number(y) });
        } else {
          reject(status);
        }
      });
    });
  }

  return getLocation;
};
