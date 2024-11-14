import { getBookmarkData } from '@/apis/getBookmarkData';
import type { GetGatheringRequest, GetGatheringResponse } from '@manchui-api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const useGetBookmarkData = (request: GetGatheringRequest) =>
  useQuery<GetGatheringResponse>({
    queryKey: ['bookmark', request],
    queryFn: () => getBookmarkData(request),
    placeholderData: keepPreviousData,
  });

export default useGetBookmarkData;
