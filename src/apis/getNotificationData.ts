import { instance } from '@/apis/api';
import type { GetNotificationRequest, GetNotificationResponse } from '@manchui-api';

export async function getNotificationData(request: GetNotificationRequest): Promise<GetNotificationResponse> {
  const { cursor, size, unreadOnly } = request;

  const params = {
    cursor,
    size: size.toString(),
    unreadOnly,
  };

  try {
    const res = await instance.get<GetNotificationResponse>('/api/notifications', { params });

    return res.data;
  } catch (e) {
    console.error('getNotificationData 함수에서 오류 발생', e);
    throw new Error('알림 데이터를 불러오는데 실패했습니다.');
  }
}
