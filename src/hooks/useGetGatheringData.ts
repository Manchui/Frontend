import { getGatheringData } from '@/apis/getGatheringData';
import type { GetGatheringRequest, GetGatheringResponse } from '@manchui-api';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

const useGetGatheringData = (request: GetGatheringRequest) =>
  useInfiniteQuery<GetGatheringResponse>({
    queryKey: ['main', request],
    queryFn: ({ pageParam = request.cursor }) => getGatheringData({ ...request, cursor: pageParam as number | undefined }),
    getNextPageParam: (lastPage) => lastPage.data.nextCursor || undefined,
    initialPageParam: undefined,
    placeholderData: keepPreviousData,
  });

export default useGetGatheringData;
