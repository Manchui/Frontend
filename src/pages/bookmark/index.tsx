/* eslint-disable tailwindcss/no-custom-classname */
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { getBookmarkData } from '@/apis/getBookmarkData';
import BookmarkBanner from '@/components/bookmark/BookmarkBanner';
import BookmarkCardList from '@/components/bookmark/BookmarkCardList';
import BookmarkContainer from '@/components/bookmark/BookmarkContainer';
import BookmarkFilter from '@/components/bookmark/BookmarkFilter';
import BookmarkHeader from '@/components/bookmark/BookmarkHeader';
import PaginationBtn from '@/components/shared/PaginationBtn';
import RootLayout from '@/components/shared/RootLayout';
import { SEO } from '@/components/shared/SEO';
import PAGE_SIZE_BY_DEVICE from '@/constants/pageSize';
import useDeviceState from '@/hooks/useDeviceState';
import useGetBookmarkData from '@/hooks/useGetBookmarkData';
import useInternalRouter from '@/hooks/useInternalRouter';
import useFilterStore, { useResetFilters } from '@/store/useFilterStore';
import type { DehydratedState } from '@tanstack/react-query';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import Error from 'public/lottie/error.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface BookmarkProps {
  dehydratedState: DehydratedState;
  initialPageSize: number;
  seo: {
    title: string;
  };
}

export default function BookmarkPage({ seo, dehydratedState, initialPageSize }: BookmarkProps) {
  const [pageSize, setPageSize] = useState(initialPageSize);

  const { page, keyword, location, category, closeDate, dateEnd, dateStart } = useFilterStore();

  const router = useInternalRouter();
  const resetFilters = useResetFilters();

  const deviceState = useDeviceState();

  const {
    data: bookmark,
    isLoading,
    isError,
  } = useGetBookmarkData({
    page,
    size: pageSize,
    query: keyword,
    location,
    category,
    sort: closeDate,
    startDate: dateStart,
    endDate: dateEnd,
  });

  const data = bookmark?.data;

  useEffect(() => {
    if (pageSize !== PAGE_SIZE_BY_DEVICE.BOOKMARK[deviceState]) {
      setPageSize(PAGE_SIZE_BY_DEVICE.BOOKMARK[deviceState]);
    }
  }, [deviceState, pageSize]);

  useEffect(() => {
    const handleRouteChange = () => {
      resetFilters();
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router, resetFilters]);

  return (
    <>
      <SEO title={seo.title} />
      <HydrationBoundary state={dehydratedState}>
        {isError ? (
          <div className="mt-[60px] h-bookmark-banner">
            <Lottie animationData={Error} className="size-full border-b-2 border-cardBorder bg-background" />
          </div>
        ) : (
          <BookmarkBanner isError={isError} />
        )}
        <RootLayout>
          <BookmarkContainer>
            <BookmarkHeader data={bookmark?.data} />
            <div className="min-h-screen w-full bg-white">
              <BookmarkFilter />
              <BookmarkCardList data={bookmark?.data} isLoading={isLoading} isError={isError} skeletonCount={pageSize} />
              {!isLoading && !isError && bookmark?.data.gatheringCount !== 0 && <PaginationBtn page={data?.page ?? 0} totalPage={data?.totalPage ?? 0} />}
            </div>
          </BookmarkContainer>
        </RootLayout>
      </HydrationBoundary>
    </>
  );
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  const initialPageSize = PAGE_SIZE_BY_DEVICE.BOOKMARK.PC;

  const request = { page: 1, size: initialPageSize };

  await queryClient.prefetchQuery({
    queryKey: ['bookmark', { page: 1 }],
    queryFn: () => getBookmarkData(request),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      seo: {
        title: '만취 - 찜한 모임 페이지',
      },
      initialPageSize,
    },
  };
};
