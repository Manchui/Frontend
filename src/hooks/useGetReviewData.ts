import { getReviewData } from '@/apis/getReviewData';
import { useScore } from '@/store/useFilterStore';
import type { GetReviewRequest, GetReviewResponse } from '@manchui-api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const useGetReviewData = (request: GetReviewRequest) => {
  const score = useScore();

  return useQuery<GetReviewResponse>({
    queryKey: [
      'review',
      request.page,
      request.size,
      request.sort,
      request.query,
      request.location,
      request.endDate,
      request.category,
      request.startDate,
      score ? score.toString() : undefined, // score가 0일 경우 undefined로 처리
    ].filter(Boolean), // undefined 값을 제거하여 queryKey가 정상적으로 동작하게 함
    queryFn: () =>
      getReviewData({
        ...request,
        score: score || undefined, // score가 0일 경우 undefined로 처리
      }), // score 반영
    placeholderData: keepPreviousData,
  });
};

export default useGetReviewData;
