import instance from '@/apis/api';
import type { GetGatheringRequest, GetGatheringResponse } from '@manchui-api';

export async function getBookmarkData(request: GetGatheringRequest): Promise<GetGatheringResponse> {
  const { page, size, sort, query, category, location, startDate, endDate } = request;

  const params = {
    page: page.toString(),
    size: size.toString(),
    ...(sort && { sort }),
    ...(query && { query }),
    ...(category && { category }),
    ...(location && { location }),
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
  };

  try {
    const res = await instance.get<GetGatheringResponse>('/api/gatherings/heart', {
      params,
    });

    return res.data;
  } catch (e) {
    console.log('getBookmarkData 함수에서 오류 발생', e);
    throw new Error('찜한 모임 데이터를 불러오는데 실패했습니다.');
  }
}
