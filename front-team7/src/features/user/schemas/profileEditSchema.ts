import * as yup from 'yup';

export const profileEditSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, '이름은 두자리 이상이여야 합니다.')
    .max(20, '이름은 20자를 넘을 수 없습니다.')
    .required('필수 입력 항목입니다.'),
  description: yup.string().max(100, '지도 소개는 100자를 넘을 수 없습니다.'),
  contactNumber: yup.string().matches(/^[0-9]*$/, '연락처는 오직 숫자만 입력 가능합니다.'),
});
