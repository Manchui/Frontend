import { getReviewData } from '@/apis/getReviewData';
import type { GetReviewRequest, GetReviewResponse } from '@manchui-api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const useGetReviewData = (request: GetReviewRequest) =>
  useQuery<GetReviewResponse>({
    queryKey: ['review', request].filter(Boolean),
    queryFn: () => getReviewData(request),
    placeholderData: keepPreviousData,
  });

export default useGetReviewData;
