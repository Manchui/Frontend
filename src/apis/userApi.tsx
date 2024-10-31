import instance from '@/apis/api';

// eslint-disable-next-line consistent-return
interface UserInfo {
  // Define the structure of the user info here
  id: string;
  image: string;
  name: string;
  // Add other fields as necessary
}

export const getUserInfo = async (accessToken: string): Promise<UserInfo | undefined> => {
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
    return undefined;
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
