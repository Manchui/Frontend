import { instance } from '@/apis/api';
import type { GetChatListResponse } from '@manchui-api';

export async function getChatMessageData(roomId: string, lastMessageId: number | undefined) {
  try {
    const queryParams = lastMessageId ? `?lastMessageId=${lastMessageId}&limit=10` : '?limit=20';
    const res = await instance.get<GetChatListResponse>(`/api/chat/list/${roomId}${queryParams}`);

    return res.data;
  } catch (e) {
    console.error('getChatMessageData 함수에서 오류 발생:', e);
    throw new Error('채팅 데이터를 불러오는데 실패했습니다.');
  }
}
