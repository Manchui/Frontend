/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { AxiosError } from 'axios';
import router from 'next/router';
import instance from '@/apis/api';
import { Toast } from '@/components/shared/Toast';
import { userStore } from '@/store/userStore';

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

const convertBlobUrlToFile = async (blobUrl: string, filename: string) => {
  try {
    console.log(blobUrl);
    // Blob URL에서 데이터 fetch
    const res = await fetch(blobUrl);
    const blob = await res.blob(); // Blob 데이터

    // Blob을 File 객체로 변환
    return new File([blob], filename, { type: blob.type });
  } catch (error) {
    console.error('Blob URL을 파일로 변환하는 중 오류 발생:', error);
    return null;
  }
};

const fetchFileFromUrl = async (fileUrl: string, fileName: string) => {
  try {
    const res = await fetch(fileUrl);
    if (!res.ok) {
      throw new Error('Failed to fetch file');
    }
    const blob = await res.blob();
    console.log(new File([blob], fileName, { type: blob.type }));
    return new File([blob], fileName, { type: blob.type });
  } catch (e) {
    console.log(e);
  }
  return null;
};

export const editUserInfo = async (nick: string, image: string) => {
  console.log(nick);
  const formData = new FormData();
  formData.append('name', nick); // FormData에 닉네임 추가
  if (image.includes('blob')) {
    const fileFromBlob = await convertBlobUrlToFile(image, 'profile-image.png');
    if (fileFromBlob) {
      formData.append('image', fileFromBlob);
    }
  } else {
    const file = await fetchFileFromUrl(image, 'downloaded-file.png');
    if (file) {
      formData.append('image', file);
    }
  }

  try {
    const res = await instance.put('/api/auths/user', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    Toast('success', '닉네임 수정 되었습니다.');
    window.location.reload();
    return res;
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    if (e && (e as AxiosError).response) {
      const errorMessage = ((e as AxiosError).response?.data as { message?: string })?.message || 'Unknown error';
      Toast('error', errorMessage);
    } else {
      Toast('error', 'An unexpected error occurred.');
    }
  }
  return null;
};

export const logout = async () => {
  const remove = userStore.getState().removeUser;
  try {
    await instance.post('/api/auths/signout', undefined, {
      headers: {
        Authorization: localStorage.getItem('accessToken'),
      },
    });

    remove();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user-storage');
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.reload();
    Toast('success', '로그아웃 되었습니다.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    Toast('error', '로그아웃에 실패했습니다.');
  }
};

interface SignupData {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
}
export const signup = async (name: string, email: string, password: string, passwordConfirm: string): Promise<SignupData> => {
  try {
    const response = await instance.post('/api/auths/signup', {
      name,
      email,
      password,
      passwordConfirm,
    });
    Toast('success', '회원가입이 완료되었습니다.');
    void router.push('/login');
    return response.data;
  } catch (error: any) {
    Toast('error', error.response.data.message);
    throw error;
  }
};

export const checkName = async (name: string) => {
  try {
    const res = await instance.post('/api/auths/check-name', {
      name,
    });
    Toast('success', res.data.message);
    return true;
  } catch (err: any) {
    Toast('error', err.response.data.message);
    return false;
  }
};
