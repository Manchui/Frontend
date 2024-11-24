/* eslint-disable @typescript-eslint/no-unsafe-call */
import { instance, instanceWithoutAccess } from '@/apis//api';
import { Toast } from '@/components/shared/Toast';
import { userStore } from '@/store/userStore';
import type { LoginType, NickCheckType, Signuptype } from '@/types/user';
import type { QueryClient } from '@tanstack/react-query';

export const checkName = async (name: string) => {
  try {
    const res = await instanceWithoutAccess.post<NickCheckType>('/api/auths/check-name', {
      name,
    });
    Toast('success', res.data.message);
    return true;
  } catch (err: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    const error = err as { response: { data: { message: string } } };
    Toast('error', error.response.data.message);
    return false;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const res = await instanceWithoutAccess.post<LoginType>('/api/auths/signin', {
      email,
      password,
    });
    const accessToken = res.headers.authorization as string;
    localStorage.setItem('accessToken', accessToken);
    Toast('success', res.data.message);
    return true;
  } catch (err: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    const error = err as { response: { data: { message: string } } };
    Toast('error', error.response.data.message);
    return false;
  }
};

export const signup = async (name: string, email: string, password: string, passwordConfirm: string) => {
  try {
    await instanceWithoutAccess.post<Signuptype>('/api/auths/signup', {
      name,
      email,
      password,
      passwordConfirm,
    });
    Toast('success', '회원가입이 완료되었습니다.');
    return true;
  } catch (error) {
    Toast('error', '회원가입에 실패했습니다.');
    throw error;
  }
};

export const logout = async (queryClient: QueryClient | undefined) => {
  const remover = userStore.getState().removeUser;
  const logoutStore = userStore.getState().logout;

  try {
    await instance.post('/api/auths/signout');
    remover();
    logoutStore();
    localStorage.removeItem('accessToken');
    if (queryClient) {
      void queryClient.invalidateQueries({ queryKey: ['queryUserInfo'] });
    }
    Toast('success', '로그아웃 되었습니다.');
  } catch (error) {
    Toast('error', '로그아웃에 실패했습니다.');
    console.log(error);
  }
};
