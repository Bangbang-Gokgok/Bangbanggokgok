import Axios, { type AxiosRequestConfig, type AxiosResponse, AxiosError } from 'axios';

const API_URL = '';

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
