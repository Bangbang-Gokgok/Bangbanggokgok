import * as yup from 'yup';

export const formSchema = yup.object().shape({
  title: yup
    .string().
    max(20, '제목은 20자를 넘을 수 없습니다.')
    .required('필수 입력 항목입니다.'),
  description: yup
    .string()
    .max(1000, '본문은 1000자를 넘을 수 없습니다.'),
  address: yup
    .string()
    .required('장소를 검색해주세요.')
});
