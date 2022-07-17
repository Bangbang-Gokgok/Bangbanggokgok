interface LocationState {
  lat: number;
  lng: number;
}

export function getLocation(address: string): Promise<LocationState> | undefined {
  // 주소가 빈 값인 경우, 엘리스 주소로 대체
  if (!address || address === 'undefined')
    address = '대전광역시 유성구 문지로 193 KAIST 캠퍼스 진리관 T 201호';

  const geocoder = new kakao.maps.services.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const { x, y } = result[0];

        resolve({ lat: Number(x), lng: Number(y) });
      } else {
        reject(status);
      }
    });
  });
}
