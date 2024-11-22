import { forwardRef } from 'react';
import * as m from 'framer-motion/m';
import ArrowBtn from 'public/icons/ArrowBtn';
import NotificationItem from '@/components/shared/GNB/Notification/NotificationItem';
import type { NotificationContent } from '@manchui-api';

export interface TabletPCUIProps {
  isError: boolean;
  isLoading: boolean;
  notifications: NotificationContent[];
  onDropClick: () => void;
}

export const TabletPCUI = forwardRef<HTMLDivElement, TabletPCUIProps>(({ notifications, isLoading, onDropClick, isError }, ref) => (
  <m.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.3 }}
    className="absolute right-0 z-50 mt-2 min-h-40 w-[370px] rounded-md bg-background p-5 shadow-2xl"
  >
    <div className="mb-5 flex items-center">
      <button type="button" onClick={onDropClick}>
        <ArrowBtn direction="left" color="#fb1c49" className="size-8" />
      </button>
      <div className="flex w-full items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-lightred">알림</h1>
        {!isLoading && <span className="rounded-md bg-lightred px-2 py-1 text-xs font-medium text-white">{`${notifications.length}개`}</span>}
      </div>
    </div>

    <div className="scrollbar-hide flex max-h-[300px] flex-col divide-y divide-gray-50 overflow-y-auto">
      {!isError && notifications.length === 0 && <h1 className="flex-center mt-16 font-medium">알림이 없습니다.</h1>}
      {!isError && notifications.map((notification) => <NotificationItem key={notification.notificationId} data={notification} />)}
      {isError && <h1 className="flex-center mt-16 font-medium">에러가 발생했습니다.</h1>}

      <div ref={ref} className="h-10 w-full flex-shrink-0" />
    </div>
  </m.div>
));

TabletPCUI.displayName = 'TabletPCUI';
