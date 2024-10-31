import type { AxiosResponse } from 'axios';
import axios from 'axios';
import type { DetailData } from '@/types/detail';

import instance from '../api';

export const getGatheringData = async () => {
  try {
    const res: AxiosResponse<DetailData> = await instance.get('http://localhost:3001/data');
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data;
    } else {
      throw new Error('error');
    }
  }
};
