/* eslint-disable tailwindcss/no-custom-classname */
import { useRef, useState } from 'react';
import { deleteNotificationData } from '@/apis/deleteNotificationData';
import type { NotificationItemProps } from '@/components/shared/GNB/Notification/NotificationItem';
import useNotificationDrag from '@/hooks/useNotificationDrag';
import { formatTimeAgo } from '@/utils/dateUtils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function MobileUI({ data }: NotificationItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

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

  const handleDelete = () => {
    setIsDeleting(true);
    mutation.mutate({ notificationId: data.notificationId });
  };

  const { handleMouseDown, handleMouseLeave, handleMouseUp, handleMouseMove, handleTouchStart, handleTouchCancel, handleTouchEnd, handleTouchMove } =
    useNotificationDrag({
      ref: containerRef,
      handleDelete,
    });

  return (
    <div className={`relative overflow-x-hidden ${isDeleting && 'animate-fadeout'}`}>
      <div
        ref={containerRef}
        className="flex min-h-[80px] w-full items-center justify-center gap-3 bg-white px-3 py-4 hover:bg-gray-50"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchCancel={handleTouchCancel}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        <p className="line-clamp-2 text-pretty text-[14px] font-medium leading-[24px]">{data.content}</p>

        <span className="text-nowrap text-xs font-semibold text-lightred">{formatTimeAgo(String(data.createdAt))}</span>
      </div>

      <div className="flex-center pl-100 absolute inset-y-0 right-0 -z-10 rounded-r-[5px] bg-gradient-to-l from-lightred via-red-200 to-transparent pr-20 text-white">
        삭제
      </div>
    </div>
  );
}
