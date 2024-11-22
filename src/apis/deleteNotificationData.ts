import { instance } from '@/apis/api';
import type { GetNotificationResponse } from '@manchui-api';

export async function deleteNotificationData({ notificationId }: { notificationId: number }): Promise<GetNotificationResponse> {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    throw new Error('Access token이 없습니다.');
  }

  try {
    const res = await instance.delete<GetNotificationResponse>(`/api/notifications/${notificationId}`);

    return res.data;
  } catch (e) {
    console.error('deleteNotificationData 함수에서 오류 발생', e);
    throw new Error('알림 데이터를 삭제하는데 실패했습니다.');
  }
}
