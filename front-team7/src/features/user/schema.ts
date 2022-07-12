import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup.string().email('이메일 형식이 아닙니다.').required('필수 항목 입니다.'),
  password: yup
    .string()
    .min(8, '비밀번호는 8자리 이상이어야 합니다.')
    .max(20, '비밀번호는 20자리를 넘을 수 없습니다.')
    .required('필수 입력 항목입니다.'),
});

export default loginSchema;
