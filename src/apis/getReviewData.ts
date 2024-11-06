import instance from '@/apis/api';
import type { GetReviewResponse } from '@manchui-api';

type GetReviewProps= {
  category?: string;
  endDate?: string;
  location?: string;
  page?: number;
  query?: string;
  size?: number;
  sort?: string;
  startDate?: string;
}

export async function getReviewData({
  page = 0,
  size = 10,
  category,
  location,
  startDate,
  endDate,
  query,
  sort,
}: GetReviewProps): Promise<GetReviewResponse> {
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

 
  try {
    const res = await instance.get<GetReviewResponse>('/api/reviews?', {
      params,
    });

    return res.data;
  } catch (e) {
    console.error('getReviewData 함수에서 오류 발생:', e);
    throw new Error('리뷰 데이터를 불러오는데 실패했습니다.');
  }
}
