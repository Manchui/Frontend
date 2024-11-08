import { getReviewData } from '@/apis/getReviewData';
import type { GetReviewRequest, GetReviewResponse } from '@manchui-api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const useGetReviewData = (request: GetReviewRequest) =>
  useQuery<GetReviewResponse>({
    queryKey: ['review', request.page, request.size, request.sort, request.query, request.location, request.endDate, request.category, request.startDate],
    queryFn: () => getReviewData(request),
    placeholderData: keepPreviousData,
  });

export default useGetReviewData;
