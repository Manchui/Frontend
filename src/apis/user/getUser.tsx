import { instance } from '@/apis/api';
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

export const useUserInfo = () =>
  useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });

export { instance };
