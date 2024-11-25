import { getReviewScoreZeroData } from '@/apis/getReviewScoreZeroData';
import type { GetReviewRequest, GetReviewResponse } from '@manchui-api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const useGetReviewScoreZeroData = (request: GetReviewRequest) =>
  useQuery<GetReviewResponse>({
    queryKey: ['review', request].filter(Boolean),
    queryFn: () => getReviewScoreZeroData(request),
    placeholderData: keepPreviousData,
  });

export default useGetReviewScoreZeroData;
