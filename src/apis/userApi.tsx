import instance from '@/apis/api';

// eslint-disable-next-line consistent-return
export const getUserInfo = async (accessToken: string) => {
  try {
    const res = await instance.get('http://localhost:3010/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res.status === 200) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return res.data;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
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