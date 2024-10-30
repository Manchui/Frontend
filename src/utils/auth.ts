/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import Cookies from 'js-cookie';

// 토큰 저장 (로그인)
export const saveToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  // 토큰 만료 시간 설정 (7일) - 추후 사용될지 확인 예정
  const expirationTime = Date.now() + 3600 * 7 * 1000;
  localStorage.setItem('tokenExpiration', expirationTime.toString());
};

// 토큰 제거 (로그아웃)
export const clearToken = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('tokenExpiration');
};

// // 아마 지워지겠지?
// // cookie 토큰 만들기
// export const saveRefreshToken = (refreshToken: string) => {
//   Cookies.set('refreshToken', refreshToken, { expires: 30 });
// };

// export const getRefreshToken = () => Cookies.get('refreshToken');

// export const clearTokens = () => Cookies.remove('refreshToken');