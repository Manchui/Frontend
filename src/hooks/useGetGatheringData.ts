import { getGatheringData } from '@/apis/getGatheringData';
import type { GetGatheringRequest, GetGatheringResponse } from '@manchui-api';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

const useGetGatheringData = (request: GetGatheringRequest) => {
  const { data, isLoading, isError, hasNextPage, fetchNextPage } = useInfiniteQuery<GetGatheringResponse>({
    queryKey: ['main', request],
    queryFn: ({ pageParam = request.cursor }) => getGatheringData({ ...request, size: 8, cursor: pageParam as number | undefined }),
    getNextPageParam: (lastPage) => lastPage.data.nextCursor || undefined,
    initialPageParam: undefined,
    placeholderData: keepPreviousData,
  });

  const mainDataFlat = data?.pages.map((page) => page.data.gatheringList).flat();

  return { mainData: mainDataFlat, isLoading, isError, hasNextPage, fetchNextPage };
};

export default useGetGatheringData;
