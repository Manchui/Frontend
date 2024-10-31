import instance from '@/apis/api';

interface SignupResponse {
  message: string;
  success: boolean;
 }
export const signup = async (nick: string, email: string, password: string, passwordConfirm: string) => {
  try {
    const res = await instance.post<SignupResponse>('/api/auths/signup', {
      name: nick,
      email,
      password,
      passwordConfirm,
    });

    return { status: res.status, error: res.data.message };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return {status: error.status, error: error.response.message};
  }
};


export const checkNick = async (nick: string) => {
  try {
    const res = await instance.get(`/api/auths/check-name?${nick}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return res.data;
  } catch (error) {
    return error;
  }
};