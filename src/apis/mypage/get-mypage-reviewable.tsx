import axios from 'axios';
import { Toast } from '@/components/shared/Toast';
import type { MyPageBaseData } from '@/types/mypage';

import instance from '../api';

// NOTE: 리뷰 작성 가능한 모임 목록 조회
export default async function getMyReviewable() {
  try {
    const res = await instance.get<MyPageBaseData>('/api/users/reviewable/list?page=1&size=10');
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
