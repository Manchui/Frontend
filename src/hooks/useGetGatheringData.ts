import { getGatheringData } from '@/apis/getGatheringData';
import type { GetGatheringRequest, GetGatheringResponse } from '@manchui-api';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

const useGetGatheringData = (request: GetGatheringRequest) =>
  useInfiniteQuery<GetGatheringResponse>({
    queryKey: ['main', request.page, request.size, request.sort, request.query, request.location, request.endDate, request.category, request.startDate],
    queryFn: ({ pageParam = request.page }) => getGatheringData({ ...request, page: pageParam as number }),
    getNextPageParam: (last) => {
      if (last?.data.totalPage > last?.data.page) {
        return last.data.page + 1;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5,
    initialPageParam: 1,
    placeholderData: keepPreviousData,
  });

export default useGetGatheringData;
