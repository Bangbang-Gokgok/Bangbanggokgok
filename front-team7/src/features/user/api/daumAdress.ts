import { useDaumPostcodePopup, type Address } from 'react-daum-postcode';

type SetAddressValueType = (arg: string) => void;

export const useDaumAddress = (setAddressValue: SetAddressValueType) => {
  const open = useDaumPostcodePopup(
    '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
  );

  function onDaumCompleteHandler(data: Address) {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setAddressValue(fullAddress);
  }

  return async () => await open({ onComplete: onDaumCompleteHandler });
};
