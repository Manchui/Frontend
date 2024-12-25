import MobileUI from '@/components/shared/GNB/Notification/NotificationItem/MobileUI';
import TabletPCUI from '@/components/shared/GNB/Notification/NotificationItem/TabletPCUI';
import type { NotificationContent } from '@manchui-api';

export interface NotificationItemProps {
  data: NotificationContent;
}

export default function NotificationItem({ data }: NotificationItemProps) {
  return (
    <>
      <div className="hidden tablet:block">
        <TabletPCUI data={data} />
      </div>
      <div className="block tablet:hidden">
        <MobileUI data={data} />
      </div>
    </>
  );
}
