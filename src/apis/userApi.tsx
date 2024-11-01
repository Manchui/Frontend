/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import instance from '@/apis/api';

interface UserInfo {
  data: {
    email: string;
    id: string;
    image: string;
    name: string;
  };
}

export const getUserInfo = async (accessToken: string) => {
  try {
    const res = await instance.get<UserInfo>('/api/auths/user', {
      headers: {
        Authorization: accessToken,
      },
    });
    return { res:res.data.data, result: true };
  } catch (error) {
    return {error, result: false};
  }
};

export const logout = () => {
  try {
    // 403 에러 해결 시 주석 해제
    // await instance.post('/api/auths/signout', {
    //   headers: {
    //     Authorization: localStorage.getItem('accessToken'),
    //   }
    // });

    localStorage.removeItem('accessToken');
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.reload();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Logout failed:', error);
  }
};
