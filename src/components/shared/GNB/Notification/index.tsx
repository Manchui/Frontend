import { useEffect, useRef, useState } from 'react';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import Image from 'next/image';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import { MobileUI } from '@/components/shared/GNB/Notification/MobileUI';
import { TabletPCUI } from '@/components/shared/GNB/Notification/TabletPCUI';
import useGetNotificationData from '@/hooks/useGetNotificationData';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import type { NotificationContent } from '@manchui-api';

export default function Notification() {
  const [sseNotifications, setSseNotifications] = useState<NotificationContent[]>([]);
  const [dropOpen, setDropOpen] = useState<boolean>(false);

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
      if ((isIntersecting || isIntersectingInMobile) && hasNextPage) void fetchNextPage();
    },
    [isIntersecting, hasNextPage, isIntersectingInMobile, fetchNextPage],
  );

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      console.error('accessToken이 만료되었습니다.');
      return undefined;
    }

    const EventSource = EventSourcePolyfill || NativeEventSource;

    const source = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/subscribe`, {
      headers: {
        Authorization: token,
      },
      heartbeatTimeout: 1000 * 60 * 30,
      withCredentials: true,
    });

    source.onopen = () => console.log('SSE 연결 성공');

    source.onmessage = (e) => {
      try {
        const notiData = e.data as string;

        // console.log('SSE data:', notiData);

        let newNotification: NotificationContent;
        try {
          newNotification = JSON.parse(notiData);
        } catch (error) {
          console.error('JSON 파싱 실패:', error, 'SSE data:', notiData);
          return;
        }

        if (!newNotification.content) {
          // console.log('No content in notification:', newNotification);
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
        // console.error('SSE 연결 실패:', e);
        if (source) source.close();
      }
    };

    return () => {
      console.log('SSE 연결 종료');
      source.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button type="button" className="relative">
      <div onClick={handelDropClick} className="flex items-center justify-center">
        <Image src="/icons/notificationIcon.svg" alt="알림 버튼" width={28} height={28} />
      </div>
      {dropOpen && (
        <>
          <div className="hidden tablet:block">
            <ErrorBoundary fallbackComponent={<div>에러가 발생했습니다.</div>}>
              <TabletPCUI ref={sentinelRef} notifications={notifications} onDropClick={handelDropClick} isLoading={isLoading} isError={isError} />
            </ErrorBoundary>
          </div>
          <div className="block tablet:hidden">
            <ErrorBoundary fallbackComponent={<div>에러가 발생했습니다.</div>}>
              <MobileUI ref={mobileSentinelRef} notifications={notifications} onDropClick={handelDropClick} isLoading={isLoading} isError={isError} />
            </ErrorBoundary>
          </div>
        </>
      )}
    </button>
  );
}
