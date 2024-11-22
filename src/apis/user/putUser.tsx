/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { AxiosError } from 'axios';

import { Toast } from '../../components/shared/Toast';
import { instance } from '../api';

const fetchFileFromUrl = async (fileUrl: string, fileName: string) => {
  try {
    const res = await fetch(fileUrl);
    if (!res.ok) {
      throw new Error('Failed to fetch file');
    }
    const blob = await res.blob();
    return new File([blob], fileName, { type: blob.type });
  } catch (e) {
    console.log(e);
  }
  return null;
};

export const editUserInfo = async (nick: string, image: string) => {
  const formData = new FormData();
  formData.append('name', nick); // FormData에 닉네임 추가

  const file = await fetchFileFromUrl(image, 'downloaded-file.png');
  if (file) {
    formData.append('image', file);
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
    if (e instanceof AxiosError && e.response && e.response.data) {
      Toast('error', e.response.data.message);
    } else {
      Toast('error', '알 수 없는 에러가 발생했습니다.');
    }
    return e;
  }
};
