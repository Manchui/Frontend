import { instance, instanceWithoutAccess } from '@/apis/api';
import { useQuery } from '@tanstack/react-query';

interface UserInfo {
  data: {
    createdAt: string;
    email: string;
    id: string;
    image: string;
    name: string;
  };
}

export const getUserInfo = async () => {
  try {
    const res = await instance.get<UserInfo>('/api/auths/user');
    return { res: res.data.data, result: true };
  } catch (error) {
    return { error, result: false };
  }
};

export const useUserInfo = () => {
  useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
};

// eslint-disable-next-line consistent-return
export const getSocialAccess = async (social: string, code: string) => {
  console.log(social, code);
  try {
    const res = await instanceWithoutAccess.get(`/login/oauth2/callback/${social}?code=${code}`);
    console.log(res.headers.authorization);
    const accessToken = res.headers.authorization as string;
    localStorage.setItem('accessToken', accessToken);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

