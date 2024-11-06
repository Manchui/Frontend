/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
import axios from 'axios';
import { IS_SERVER } from '@/constants/server';

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
        const excludedUrls = [
          '/api/auths/signup',
          '/api/auths/check-name',
          '/api/auths/signin',
          '/api/gatherings/public',
          '/api/reviews/score',
          '/api/reviews?page',
        ]; // 예외 URL 리스트
        if (!excludedUrls.includes(config.url || '')) {
          config.headers.Authorization = `${token}`; // 나중에 Bearer는 서버에서 따로 빼달라고 해야함
        }
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default instance;
