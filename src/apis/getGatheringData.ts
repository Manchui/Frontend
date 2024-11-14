import instance from '@/apis/api';
import type { GetGatheringRequest, GetGatheringResponse } from '@manchui-api';

export async function getGatheringData(request: GetGatheringRequest): Promise<GetGatheringResponse> {
  const { size, sort, query, category, location, startDate, endDate, cursor } = request;

  const params = {
    cursor,
    size: size.toString(),
    ...(sort && { sort }),
    ...(query && { query }),
    ...(category && { category }),
    ...(location && { location }),
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
  };

  try {
    const res = await instance.get<GetGatheringResponse>('/api/gatherings/public', {
      params,
    });

    return res.data;
  } catch (e) {
    console.error('getGatheringData 함수에서 오류 발생:', e);
    throw new Error('모임 데이터를 불러오는데 실패했습니다.');
  }
}
