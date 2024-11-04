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

const API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJFbWFpbCI6InRlc3QxQHRlc3QuY29tIiwiaWF0IjoxNzMwNjg4ODM5LCJleHAiOjE3MzA2OTA2Mzl9.KsPQ0cGKyDakU6VZfKWE8P26mfJ_cKMUCTePLzTK9gg';

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

    const res = await instance.get<GetGatheringResponse>('/api/gatherings', {
      params,

      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    return res.data;
  } catch (e) {
    console.error('getGatheringData 함수에서 오류 발생:', e);
    throw e;
  }
}
