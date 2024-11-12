/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
import type { AxiosError } from 'axios';
import axios from 'axios';
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
  timeout: 3000,
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

// instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     // accessToken이 없을 때 다시 로그인 페이지로 이동
//     if (error.response.status === 400) {
//       try{

//       } catch (e) {

//       }
//       localStorage.setItem('accessToken', '');
//     }
//     return Promise.reject(error);
//   },
// );

// instance.interceptors.request.use((config) => {
//   // 요청 전 refresh API 여부를 표시하는 플래그 추가
//   if (config.url.includes('/reissue')) {
//     config.isRefreshRequest = true;
//   }
//   return config;
// });

const tokenRefresh = async (): Promise<string> => {
  const res = await instance.post('/api/auths/reissue', undefined, {
    headers: {
      Authorization: localStorage.getItem('accessToken'),
    },
  });

  const token = res.headers.authorization || '';
  return token as string;
};

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      try {
        const accessToken = await tokenRefresh();
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          return axios.request({
            ...error.config,
            headers: {
              ...error.config?.headers,
              Authorization: accessToken,
            },
          });
        }
        return Promise.reject(error);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
