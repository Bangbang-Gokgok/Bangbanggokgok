import Axios, { type AxiosRequestConfig, type AxiosResponse, AxiosError } from 'axios';

let API_URL = '';

if (process.env.NODE_ENV !== 'development') {
<<<<<<< HEAD
  API_URL = process.env.SERVER_URL;
=======
  API_URL = 'http://kdt-sw2-seoul-team07.elicecoding.com';
>>>>>>> 3ea6173b9a3f1c9362cb8e4950f4b643bd4ae2e0
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
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
  async (error: AxiosError) => {
    const { config } = error;
    const status = error.response?.status;
    const reason = error.response?.data.reason;

    console.log(error);

    const originalRequest = config;

    if (status === 401 && reason === 'login된 user 정보가 없습니다.') {
      await axios.get<never, void>('/api/loginCheck').catch(() => {
        alert('사용자 정보가 없습니다. 다시 로그인 해주세요.');
        window.location.href = '/login';
      });

      return axios(originalRequest);
    }

    return Promise.reject(error);
  }
);
