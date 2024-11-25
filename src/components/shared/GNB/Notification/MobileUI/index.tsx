/* eslint-disable tailwindcss/no-custom-classname */
import { forwardRef } from 'react';
import ArrowBtn from 'public/icons/ArrowBtn';
import NotificationItem from '@/components/shared/GNB/Notification/NotificationItem';
import type { NotificationContent } from '@manchui-api';

export interface MobileUIProps {
  isError: boolean;
  isLoading: boolean;
  notifications: NotificationContent[];
  onDropClick: () => void;
}

export const MobileUI = forwardRef<HTMLDivElement, MobileUIProps>(({ notifications, isLoading, onDropClick, isError }, ref) => (
  <div className="fixed inset-0 z-50 bg-white p-10">
    <div className="mb-5 flex items-center">
      <button type="button" onClick={onDropClick}>
        <ArrowBtn direction="left" color="#fb1c49" className="size-8" />
      </button>
      <div className="flex w-full items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold leading-[32px] text-lightred">알림</h1>
        {!isLoading && <span className="rounded-md bg-lightred px-4 py-2 text-xs font-medium text-white">{`${notifications.length}개`}</span>}
      </div>
    </div>

    <div className="scrollbar-hide flex max-h-full flex-col divide-y divide-gray-50 overflow-y-auto">
      {!isError && notifications.length === 0 && <h1 className="flex-center mt-16 font-medium">알림이 없습니다.</h1>}
      {!isError && notifications.map((notification) => <NotificationItem key={notification.notificationId} data={notification} />)}
      {isError && <h1 className="flex-center mt-16 font-medium">에러가 발생했습니다.</h1>}

      <div ref={ref} className="h-10 w-full flex-shrink-0" />
    </div>
  </div>
));

MobileUI.displayName = 'MobileUI';
