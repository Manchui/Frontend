import axios from 'axios';
import { Toast } from '@/components/shared/Toast';
import type { MyPageBaseData } from '@/types/mypage';

import instance from '../api';

// NOTE: 내가 작성한 후기 목록
export default async function getMyReviews(page: number, size: number) {
  try {
    const res = await instance.get<MyPageBaseData>(`/api/users/reviews?page=${page}&size=${size}`);
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
