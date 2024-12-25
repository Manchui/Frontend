/* eslint-disable tailwindcss/no-custom-classname */
import Link from 'next/link';
import XIcon from 'public/icons/XIcon';
import { deleteNotificationData } from '@/apis/deleteNotificationData';
import type { NotificationItemProps } from '@/components/shared/GNB/Notification/NotificationItem';
import { formatTimeAgo } from '@/utils/dateUtils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function TabletPCUI({ data }: NotificationItemProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteNotificationData,
    onMutate: async ({ notificationId }) => {
      // 알림 데이터에 대한 모든 퀴리요청을 취소하여 이전 서버 데이터가 낙관적 업데이트를 덮어쓰지 않도록 함 -> refetch 취소시킴
      // 모든 관련 쿼리 요청 취소
      await queryClient.cancelQueries({ queryKey: ['notification'] });

      // 현재 캐시된 데이터 가져오기
      // 이전 상태 저장(rollback을 사용하기 위해서)
      const previousNotifications = queryClient.getQueryData<NotificationItemProps[]>(['notification']);

      // 낙관적 업데이트: 삭제된 항목을 제외한 상태로 캐시를 갱신
      queryClient.setQueryData(['notification'], (oldNotification: NotificationItemProps[] | undefined) => {
        if (!oldNotification) return undefined;

        return oldNotification.filter((notificaiton) => notificaiton.data.notificationId !== notificationId);
      });

      return { previousNotifications };
    },
    onError: (e) => {
      console.log('알림 삭제 실패:', e);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notification'] });
    },
  });

  const handleDelete = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    mutation.mutate({ notificationId: data.notificationId });
  };

  return (
    <Link href={`/detail/${data.gatheringId}`} className="relative flex min-h-[100px] w-full flex-col bg-white px-8 py-4 text-left hover:bg-gray-50">
      <XIcon color="black" className="absolute right-2 top-2 hidden size-4 tablet:block" onClick={handleDelete} />
      <p className="line-clamp-2 text-pretty text-[14px] font-medium leading-[24px]">{data.content}</p>
      <span className="mt-auto text-xs font-semibold text-lightred">{formatTimeAgo(String(data.createdAt))}</span>
    </Link>
  );
}
