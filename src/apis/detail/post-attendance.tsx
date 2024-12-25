import axios from 'axios';
import { Toast } from '@/components/shared/Toast';
import type { BaseData } from '@/types/detail';

import { instance } from '../api';

export default async function submitAttendance(gatheringsId: number) {
  try {
    const res = await instance.post<BaseData>(`/api/gatherings/${gatheringsId}/attendance`);
    return res.data.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data;
    } else {
      Toast('error', '문제가 발생했습니다.');
      throw new Error('error');
    }
  }
}
