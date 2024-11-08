import axios from 'axios';
import { Toast } from '@/components/shared/Toast';
import type { MyPageBaseData } from '@/types/mypage';

import instance from '../api';

// NOTE: 후기 생성
export default async function createReview(gatheringId: number, value: string, isScore: number) {
  const formData = new FormData();
  formData.append('comment', value);
  formData.append('score', isScore.toString());

  try {
    const res = await instance.post<MyPageBaseData>(`/api/reviews/${gatheringId}`, formData);
    return res.data.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data;
    } else {
      Toast('error', '문제가 발생했습니다.');
      throw new Error('error');
    }
  }
}
