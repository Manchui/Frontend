/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
import type { AxiosError, AxiosRequestConfig } from 'axios';
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

// instance.interceptors.response.use(
//   async (config) => {
//     const isLoggedIns = userStore((state) => state.isLoggedIn);
//     const accessToken = localStorage.getItem('accessToken');

//     if (isLoggedIns && getCookie('refresh')) {
//       try {
//         const res = await instance.post('/api/auths/reissue', undefined, {
//           headers: {
//             Authorization: accessToken,
//           },
//         });

//         localStorage.setItem('accessToken', res.data.accessToken);
//         instance.defaults.headers.Authorization = res.data.accessToken;
//         config.headers.Authorization = res.data.accessToken;
//         console.log('토큰 재발급 성공');
//         return config;
//       } catch (e) {
//         console.error('토큰 재발급 실패', e);
//         localStorage.removeItem('accessToken');
//         Toast('warning', '로그인이 필요한 서비스입니다.');
//       }
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

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

const getCookie = (key: string) => {
  const target = document.cookie.split('; ').find((cookie) => cookie.startsWith(key));
  if (target) {
    return target.split('=')[1];
  }
  return '';
};

// instance.interceptors.request.use((config) => {
//   // 요청 전 refresh API 여부를 표시하는 플래그 추가
//   if (config.url.includes('/reissue')) {
//     config.isRefreshRequest = true;
//   }
//   return config;
// });

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  isRefreshRequest?: boolean;
  retry?: boolean;
}

const tokenRefresh = async () => {
  const storedRefreshToken = getCookie('refresh');
  if (!storedRefreshToken) {
    throw new Error(`refresh token이 없습니다: ${getCookie('refresh')}`);
  }

  const res = await instance.post('/api/auths/reissue', undefined, {
    headers: {
      Authorization: localStorage.getItem('accessToken'),
    },
  });

  const { accessToken } = res.data;
  localStorage.setItem('accessToken', accessToken);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return accessToken;
};

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig | undefined;

    if (error.response?.status === 401) {
      // originalRequest.retry = true;
      try {
        const accessToken = await tokenRefresh();
        instance.defaults.headers.common.Authorization = accessToken;
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = accessToken;
        console.log('토큰 재발급 성공');
        return await instance(originalRequest);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
