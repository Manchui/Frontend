import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { MessageWithLink } from '@/components/main/MainCardSection/CardSection';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import Skeleton from '@/components/shared/Skeleton';
import useGetGatheringData from '@/hooks/useGetGatheringData';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useFilterStore from '@/store/useFilterStore';

const NoData = dynamic(() => import('@/components/shared/NoData'), { ssr: false });
const CardItem = dynamic(() => import('./CardItem'), { ssr: false });

function CardSectionContent() {
  const { keyword, location, category, closeDate, dateStart, dateEnd } = useFilterStore();

  const sentinelRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(sentinelRef);

  const { mainData, hasNextPage, fetchNextPage } = useGetGatheringData({
    query: keyword,
    location,
    category,
    sort: closeDate,
    startDate: dateStart,
    endDate: dateEnd,
    cursor: undefined,
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage) void fetchNextPage();
  }, [isIntersecting, hasNextPage, fetchNextPage]);

  return (
    <>
      <div className="px-5">
        <ul className="grid grid-cols-2 gap-5 tablet:grid-cols-3 pc:grid-cols-4">
          {mainData
            ?.filter((data, index, self) => index === self.findIndex((t) => t.gatheringId === data.gatheringId))
            .map((data) => <CardItem key={`${data.gatheringId}-${data.createdAt}`} data={data} />)}
        </ul>
        {mainData?.length === 0 && <NoData use="main" />}
      </div>
      <div ref={sentinelRef} className="h-10 w-full flex-shrink-0 opacity-0" />
    </>
  );
}

export function CardSkeleton() {
  return (
    <div className="px-5">
      <ul className="grid h-full grid-cols-2 gap-4 tablet:grid-cols-3 pc:grid-cols-4">
        {Array.from({ length: 8 }).map((_, idx) => (
          <Skeleton key={idx} className="h-[350px] w-full" />
        ))}
      </ul>
    </div>
  );
}

export default function CardSection() {
  return (
    <ErrorBoundary
      fallbackComponent={
        <div className="relative top-[100px]">
          <MessageWithLink message="네트워크 연결을 확인해주세요." buttonText="다시 시도하기" onClick={() => window.location.reload()} />
        </div>
      }
    >
      <CardSectionContent />
    </ErrorBoundary>
  );
}
