import instance from '@/apis/api';

interface UserInfo {
  id: string;
  image: string;
  name: string;
}

export const getUserInfo = async (accessToken: string): Promise<UserInfo> => {
  try {
    const res = await instance.get<UserInfo>('http://localhost:3010/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return { id: '', image: '', name: '' };
  }
};

export const logout = async () => {
  try {
    await instance.post('http://localhost:3011/logout');
    localStorage.removeItem('accessToken');
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.reload();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Logout failed:', error);
  }
};
