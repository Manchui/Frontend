import { getBookmarkData } from '@/apis/getBookmarkData';
import type { GetBookmarkRequest, GetBookmarkResponse } from '@manchui-api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const useGetBookmarkData = (request: GetBookmarkRequest) =>
  useQuery<GetBookmarkResponse>({
    queryKey: ['bookmark', request],
    queryFn: () => getBookmarkData(request),
    placeholderData: keepPreviousData,
  });

export default useGetBookmarkData;
