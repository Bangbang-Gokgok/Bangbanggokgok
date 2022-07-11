// import { useEffect } from 'react';
// import { useRecoilValue } from 'recoil';
import Axios, { type AxiosRequestConfig, type AxiosResponse, type AxiosError } from 'axios';

// import { authAtom } from '@/store';

const API_URL = '';

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // config.headers!['Authorization'] = `Bearer ${auth.token || ''}`;
    config.headers!['Accept'] = 'application/json';
    config.headers!['Content-Type'] = 'application/json';
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    // const message = error.response?.data?.message || error.message;
    // 에러 처리..(toast)

    return Promise.reject(error);
  }
);

// export const useAxiosInterceptor = () => {
//   const auth = useRecoilValue(authAtom);

//   useEffect(() => {
//     const reqInterceptor = axios.interceptors.request.use(
//       (config: AxiosRequestConfig) => {
//         // config.headers!['Authorization'] = `Bearer ${auth.token || ''}`;
//         config.headers!['Accept'] = 'application/json';
//         config.headers!['Content-Type'] = 'application/json';
//         return config;
//       },
//       (error: AxiosError) => {
//         return Promise.reject(error);
//       }
//     );

//     const resInterceptor = axios.interceptors.response.use(
//       (response: AxiosResponse) => {
//         return response.data;
//       },
//       (error: AxiosError) => {
//         // const message = error.response?.data?.message || error.message;
//         // 에러 처리..(toast)

//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       axios.interceptors.request.eject(reqInterceptor);
//       axios.interceptors.response.eject(resInterceptor);
//     };
//   }, []);
// };
