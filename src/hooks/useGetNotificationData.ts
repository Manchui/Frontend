import { getNotificationData } from '@/apis/getNotificationData';
import type { GetNotificationRequest, GetNotificationResponse } from '@manchui-api';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

const useGetNotificationData = (request: GetNotificationRequest) =>
  useInfiniteQuery<GetNotificationResponse>({
    queryKey: ['notification', request],
    queryFn: ({ pageParam = request.cursor }) => getNotificationData({ ...request, cursor: pageParam as number | undefined }),
    getNextPageParam: (lastPage) => lastPage.data.nextCursor || undefined,
    initialPageParam: undefined,
    placeholderData: keepPreviousData,
  });

export default useGetNotificationData;
