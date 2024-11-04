import axios from 'axios';
import type { BaseData } from '@/types/detail';

import instance from '../api';

export default async function getGatheringData(gatheringsId: string) {
  try {
    const res = await instance.get<BaseData>(`/api/gatherings/${gatheringsId}`);
    return res.data.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data;
    } else {
      throw new Error('error');
    }
  }
}
