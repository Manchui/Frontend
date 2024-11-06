/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
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

// const convertBlobUrlToFile2 = async (url: string) => {
//   try {
//     console.log('다운로드시작');
//     const response = await axios.get(url, { responseType: 'blob' });
//     const blob = new Blob([response.data]);
//     const blobURL = URL.createObjectURL(blob);
//     const a = await convertBlobUrlToFile(blobURL, 'profile-image.png');
//     console.log(a);
//     return a;
//   } catch (error) {
//     console.log('다운로드실패', error);
//     return null;
//   }
// };

export const editUserInfo = async (nick: string, image: string) => {
  const formData = new FormData();
  formData.append('name', nick); // FormData에 닉네임 추가
  if (image.includes('blob')) {
    const fileFromBlob = await convertBlobUrlToFile(image, 'profile-image.png');
    if (fileFromBlob) {
      formData.append('image', fileFromBlob);
    }
  }
  // else if (!image.includes('blob')) {
  //   const fileFromUrl = await convertBlobUrlToFile2(image);
  //   formData.append('image', fileFromUrl);
  // }

  try {
    const res = await instance.put('/api/auths/user', formData, {
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'multipart/form-data',
      },
    });

    Toast('success', '닉네임 수정 되었습니다.');
    console.log('API 응답:', res);
    window.location.reload();
    return { res: res.data, result: true };
  } catch (error) {
    console.error('요청 중 오류 발생:', error);
    return error;
  }
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
    console.error('Logout failed:', error);
    Toast('error', '로그아웃에 실패했습니다.');
  }
};
