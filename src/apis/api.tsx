/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */

import type { AxiosError } from 'axios';
import axios from 'axios';
import { IS_SERVER } from '@/constants/server';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const instanceWithoutAccess = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    if (!IS_SERVER) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

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
        if (axios.isAxiosError(e)) {
          throw e.response?.data;
        } else {
          throw new Error('error');
        }
      }
    } else if(error.response?.status === 400) {
      localStorage.removeItem('accessToken');
    }

    return Promise.reject(error);
  },
);

export { instance, instanceWithoutAccess };
