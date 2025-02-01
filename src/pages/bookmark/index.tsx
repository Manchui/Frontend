/* eslint-disable tailwindcss/no-custom-classname */
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { getBookmarkData } from '@/apis/getBookmarkData';
import BookmarkBanner from '@/components/bookmark/BookmarkBanner';
import BookmarkContainer from '@/components/bookmark/BookmarkContainer';
import { BookmarkHeaderSkeleton } from '@/components/bookmark/BookmarkHeader';
import { CardSkeleton } from '@/components/main/CardSection';
import FilterList from '@/components/main/HeaderSection/FilterList';
import RootLayout from '@/components/shared/RootLayout';
import { SEO } from '@/components/shared/SEO';
import PAGE_SIZE_BY_DEVICE from '@/constants/pageSize';
import useDeviceState from '@/hooks/useDeviceState';
import useGetBookmarkData from '@/hooks/useGetBookmarkData';
import useInternalRouter from '@/hooks/useInternalRouter';
import useFilterStore, { useResetFilters } from '@/store/useFilterStore';
import { dehydrate, QueryClient } from '@tanstack/react-query';

const BookmarkHeader = dynamic(() => import('@/components/bookmark/BookmarkHeader'), { loading: () => <BookmarkHeaderSkeleton />, ssr: false });
const BookmarkSection = dynamic(() => import('@/components/bookmark/BookmarkSection'), { loading: () => <CardSkeleton />, ssr: false });

interface BookmarkProps {
  seo: {
    title: string;
  };
}

export default function BookmarkPage({ seo }: BookmarkProps) {
  const deviceState = useDeviceState();

  const [pageSize, setPageSize] = useState(PAGE_SIZE_BY_DEVICE.MAIN[deviceState]);

  const { page, keyword, location, category, closeDate, dateEnd, dateStart } = useFilterStore();

  const router = useInternalRouter();
  const resetFilters = useResetFilters();

  const { bookmark, isLoading, isError } = useGetBookmarkData({
    page,
    size: pageSize,
    query: keyword,
    location,
    category,
    sort: closeDate,
    startDate: dateStart,
    endDate: dateEnd,
  });

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
      <BookmarkBanner />
      <RootLayout>
        <BookmarkContainer>
          <BookmarkHeader data={bookmark} />
          <FilterList />
          <BookmarkSection bookmark={bookmark} isLoading={isLoading} isError={isError} />
        </BookmarkContainer>
      </RootLayout>
    </>
  );
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['bookmark', { size: 3 }],
    queryFn: () => getBookmarkData({ size: 3 }),
  });

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      seo: {
        title: '만취 - 찜한 모임 페이지',
      },
    },
  };
};
