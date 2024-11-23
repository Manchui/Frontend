import { useEffect, useRef, useState } from 'react';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import NotificationIcon from 'public/icons/NotificationIcon';
import { MobileUI } from '@/components/shared/GNB/Notification/MobileUI';
import { TabletPCUI } from '@/components/shared/GNB/Notification/TabletPCUI';
import useGetNotificationData from '@/hooks/useGetNotificationData';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import type { NotificationContent } from '@manchui-api';

export default function Notification() {
  const [sseNotifications, setSseNotifications] = useState<NotificationContent[]>([]);
  const [dropOpen, setDropOpen] = useState<boolean>(false);

  const EventSource = EventSourcePolyfill || NativeEventSource;

  const sentinelRef = useRef<HTMLDivElement>(null);
  const mobileSentinelRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(sentinelRef);
  const isIntersectingInMobile = useIntersectionObserver(mobileSentinelRef);

  const { data, isLoading, isError, hasNextPage, fetchNextPage } = useGetNotificationData({ size: 5, cursor: undefined });

  const handelDropClick = () => setDropOpen((prev) => !prev);

  const pagedNotifications = data?.pages.flatMap((page) => page.data.notificationContent) || [];

  const notifications = [...sseNotifications, ...pagedNotifications];

  useEffect(
    function handleScrollFetch() {
      if ((isIntersecting || isIntersectingInMobile) && hasNextPage) {
        void fetchNextPage();
      }
    },
    [isIntersecting, hasNextPage, isIntersectingInMobile, fetchNextPage],
  );

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('accessToken이 만료되었습니다.');
      return undefined;
    }

    const source = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/subscribe`, {
      headers: {
        Authorization: accessToken,
      },
      heartbeatTimeout: 1000 * 60 * 30,
      withCredentials: true, // 다른 도메인에 요청을 보낼 때, 요청에 인증 정보를 담을지 여부를 결정하는 옵션, 이 옵션을 설정하지 않으면 서버로 요청을 보낼 때 쿠키가 포함되지 않습니다.
    });

    source.onopen = () => console.log('SSE 연결 성공');

    source.onmessage = (e) => {
      try {
        const notiData = e.data as string;

        console.log('SSE data:', notiData);

        if (notiData.trim() === ':ping') {
          console.log('Ping received');
          return;
        }

        let newNotification: NotificationContent;
        try {
          newNotification = JSON.parse(notiData);
        } catch (error) {
          console.error('JSON 파싱 실패:', error, 'SSE data:', notiData);
          return;
        }

        if (!newNotification.content) {
          console.log('No content in notification:', newNotification);
          return;
        }

        setSseNotifications((prev) => {
          const isDuplicate = prev.some((notification) => notification.notificationId === newNotification.notificationId);
          if (isDuplicate) {
            return prev;
          }
          return [newNotification, ...prev];
        });
      } catch (err) {
        console.error('SSE 데이터 파싱 실패:', err);
      }
    };
    source.onerror = (e) => {
      if (e) {
        console.error('SSE 연결 실패:', e);
        source.close();
      }
    };

    return () => {
      console.log('연결 끝');
      source.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button type="button" className="relative">
      <NotificationIcon color="black" className="size-6 cursor-pointer" onClick={handelDropClick} />
      {dropOpen && (
        <>
          <div className="hidden tablet:block">
            <TabletPCUI ref={sentinelRef} notifications={notifications} onDropClick={handelDropClick} isLoading={isLoading} isError={isError} />
          </div>
          <div className="block tablet:hidden">
            <MobileUI ref={mobileSentinelRef} notifications={notifications} onDropClick={handelDropClick} isLoading={isLoading} isError={isError} />
          </div>
        </>
      )}
    </button>
  );
}
