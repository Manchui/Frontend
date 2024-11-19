import { Toast } from '../../components/shared/Toast';
import { instance } from '../api';

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
    Toast('error', '회원가입에 실패했습니다.');
    throw e;
  }
};
