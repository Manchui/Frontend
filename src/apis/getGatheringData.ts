import instance from '@/apis/api';
import { IS_SERVER } from '@/constants/server';
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
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    ...(sort && { sort }),
    ...(query && { query }),
    ...(category && { category }),
    ...(location && { location }),
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
  });

  const endpoint = !IS_SERVER && localStorage.getItem('accessToken') ? '/api/gatherings' : '/api/gatherings/public';

  try {
    const res = await instance.get<GetGatheringResponse>(endpoint, {
      params,
    });

    return res.data;
  } catch (e) {
    console.error('getGatheringData 함수에서 오류 발생:', e);
    throw new Error('모임 데이터를 불러오는데 실패했습니다.');
  }
}
