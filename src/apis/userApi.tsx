import instance from '@/apis/api';

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
