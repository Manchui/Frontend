import { getChatMessageData } from '@/apis/getChatMessageData';
import { getRoomUserData } from '@/apis/getRoomUsersData';
import type { GetChatListResponse, RoomUserResponse } from '@manchui-api';
import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query';

export default function useGetChattingData(roomId: string) {
  const { data: roomData } = useQuery<RoomUserResponse>({
    queryKey: ['roomUsers', roomId],
    queryFn: () => getRoomUserData(roomId),
  });

  const {
    data: chatData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<GetChatListResponse>({
    queryKey: ['chatMessages', roomId],
    queryFn: ({ pageParam }) => getChatMessageData(roomId, pageParam as number | undefined),
    getNextPageParam: (lastPage) => (lastPage.data.hasNext ? lastPage.data.nextCursor : undefined),
    initialPageParam: undefined,
    placeholderData: keepPreviousData,
  });

  return { chatData, roomUser: roomData?.data.userInfoList, hasNextPage, fetchNextPage };
}
