import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json', // JSON 형식으로 요청을 보냄
    'X-Custom-Header': 'foobar', // 커스텀 헤더
  },
});

instance.interceptors.request.use(
  (request) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
    }
    return request;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  (_error) => Promise.reject(new Error('Error message')),
);

export default instance;
