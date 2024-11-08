/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
import axios from 'axios';
import { Toast } from '@/components/shared/Toast';
import { IS_SERVER } from '@/constants/server';

const EXCLUDUDED_URLS = [
  /^\/api\/auths\/signup$/,
  /^\/api\/auths\/check-name$/,
  /^\/api\/auths\/signin$/,
  /^\/api\/reviews\/score$/,
  /^\/api\/reviews(\?.*)?$/,
  /^\/api\/gatherings\/public(\?.*)?$/,
];

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json', // JSON 형식으로 요청을 보냄
  },
});

// 인터셉터를 이용하여 예외 리스트를 제외하곤 모든 요청에 토큰을 담아 보내도록 설정
instance.interceptors.request.use(
  (config) => {
    if (!IS_SERVER) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const isExcluded = EXCLUDUDED_URLS.some((regex) => regex.test(config.url || ''));
        if (!isExcluded) {
          config.headers.Authorization = `${token}`;
        }
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
      try {
        const res = await instance.post('/api/auths/reissue');
        localStorage.setItem('accessToken', res.data.accessToken);
        return instance(originalRequest);
      } catch (e) {
        console.error('토큰 재발급 실패', e);
        localStorage.removeItem('accessToken');
        Toast('warning', '로그인이 필요한 서비스입니다.');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // accessToken이 없을 때 다시 로그인 페이지로 이동
    if (error.response && error.response.status === 400) {
      if (error.response.data.message === '유효한 Access 토큰이 요청에 포함되지 않았습니다.') {
        localStorage.removeItem('accessToken');
        Toast('warning', '로그인이 필요한 서비스입니다.');
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
