import instance from '@/apis/api';
import type { GetGatheringResponse } from '@manchui-api';

interface GetGatheringDataProps {
  category?: string;
  endDate?: string;
  location?: string;
  page?: number;
  query?: string;
  size?: number;
  sort?: string;
  startDate?: string;
}

export async function getGatheringData({
  page = 1,
  size = 20,
  category,
  location,
  startDate,
  endDate,
  query,
  sort,
}: GetGatheringDataProps): Promise<GetGatheringResponse> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });
    if (sort) {
      params.append('sort', sort);
    }
    if (query) {
      params.append('query', query);
    }
    if (category) {
      params.append('category', category);
    }
    if (location) {
      params.append('location', location);
    }
    if (startDate) {
      params.append('startDate', startDate);
    }
    if (endDate) {
      params.append('endDate', endDate);
    }

    const endpoint = typeof window !== 'undefined' && localStorage.getItem('accessToken') ? '/api/gatherings' : '/api/gatherings/public';

    const res = await instance.get<GetGatheringResponse>(endpoint, {
      params,
    });

    return res.data;
  } catch (e) {
    console.error('getGatheringData 함수에서 오류 발생:', e);
    throw e;
  }
}
