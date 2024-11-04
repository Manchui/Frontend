/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import instance from '@/apis/api';
import { Toast } from '@/components/shared/Toast';

interface UserInfo {
  data: {
    email: string;
    id: string;
    image: string;
    name: string;
  };
}

export const getUserInfo = async () => {
  try {
    const res = await instance.get<UserInfo>('/api/auths/user');
    return { res:res.data.data, result: true };
  } catch (error) {
    return {error, result: false};
  }
};

// 400 에러 해결 시 async 추가
export const logout = () => {
  try {
    // 400 에러 해결 시 주석 해제
    // await instance.post('/api/auths/signout', undefined, {
    //   headers: {
    //     Authorization: localStorage.getItem('accessToken'),
    //   }
    // });
    localStorage.removeItem('accessToken');
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.reload();
    Toast('success', '로그아웃 되었습니다.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Logout failed:', error);
    Toast('error', '로그아웃에 실패했습니다.');
  }
};
