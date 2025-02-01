import { instance } from '@/apis/api';
import type { RoomUserResponse } from '@manchui-api';

export async function getRoomUserData(roomId: string) {
  try {
    const res = await instance.get<RoomUserResponse>(`/api/chat/user/list/${roomId}`);

    return res.data;
  } catch (e) {
    console.error('getRoomUserData 함수에서 오류 발생:', e);
    throw new Error('채팅방 유저 데이터를 불러오는데 실패했습니다.');
  }
}
