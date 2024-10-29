import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json', // JSON 형식으로 요청을 보냄
    'X-Custom-Header': 'foobar', // 커스텀 헤더
  },
});

export default instance;