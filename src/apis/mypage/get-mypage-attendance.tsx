import axios from 'axios';
import { Toast } from '@/components/shared/Toast';
import type { MyPageBaseData } from '@/types/mypage';

import instance from '../api';

export default async function getMyAttendance() {
  try {
    const res = await instance.get<MyPageBaseData>('/api/users/gatherings/attendance?page=0&size=10');
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
