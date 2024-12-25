import { useEffect, useMemo, useRef } from 'react';
import { getGatheringData } from '@/apis/getGatheringData';
import Carousel from '@/components/main/Carousel';
import FilterSection from '@/components/main/FilterSection';
import HeaderSection from '@/components/main/HeaderSection';
import MainCardSection from '@/components/main/MainCardSection';
import MainContainer from '@/components/main/MainContainer';
import SpeedDial from '@/components/main/SpeedDial';
import RootLayout from '@/components/shared/RootLayout';
import { SEO } from '@/components/shared/SEO';
import PAGE_SIZE_BY_DEVICE from '@/constants/pageSize';
import useDeviceState from '@/hooks/useDeviceState';
import useGetGatheringData from '@/hooks/useGetGatheringData';
import useInternalRouter from '@/hooks/useInternalRouter';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useFilterStore, { useResetFilters } from '@/store/useFilterStore';
import { userStore } from '@/store/userStore';
import type { DehydratedState } from '@tanstack/react-query';
import { dehydrate, HydrationBoundary, QueryClient, useQueryClient } from '@tanstack/react-query';

interface MainPageProps {
  dehydratedState: DehydratedState;
  seo: {
    title: string;
  };
}

export default function MainPage({ seo, dehydratedState }: MainPageProps) {
  const { keyword, location, category, closeDate, dateStart, dateEnd } = useFilterStore();

  const scrollRef = useRef<HTMLDivElement>(null);

  const router = useInternalRouter();
  const resetFilters = useResetFilters();

  const sentinelRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(sentinelRef);

  const deviceState = useDeviceState();

  const isLoggedIn = userStore((state) => state.isLoggedIn);
  const queryClient = useQueryClient();

  const pageSize = useMemo(() => PAGE_SIZE_BY_DEVICE.MAIN[deviceState], [deviceState]);

  const {
    data: mainData,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useGetGatheringData({
    cursor: undefined,
    size: pageSize,
    query: keyword,
    location,
    category,
    sort: closeDate,
    startDate: dateStart,
    endDate: dateEnd,
  });

  const mainDataList = useMemo(() => mainData?.pages.flatMap((page) => page.data.gatheringList) || [], [mainData]);

  useEffect(() => {
    if (isLoggedIn) {
      void queryClient.invalidateQueries({ queryKey: ['main'] });
    }
  }, [isLoggedIn, queryClient]);

  useEffect(
    function handleScrollFetch() {
      if (isIntersecting && hasNextPage) void fetchNextPage();
    },
    [isIntersecting, hasNextPage, fetchNextPage],
  );

  useEffect(() => {
    const handleRouteChange = () => {
      resetFilters();
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router, resetFilters]);

  const handleScrollToFilter = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <HydrationBoundary state={dehydratedState}>
      <SEO title={seo.title} />
      <Carousel handleScrollToFilter={handleScrollToFilter} />
      <RootLayout>
        <MainContainer>
          <HeaderSection />
          <FilterSection />
          <MainCardSection scrollRef={scrollRef} isError={isError} isLoading={isLoading} pageSize={pageSize} mainData={mainDataList} />
          {!isError && <div ref={sentinelRef} className="h-20 w-full flex-shrink-0 opacity-0" />}
          <SpeedDial />
        </MainContainer>
      </RootLayout>
    </HydrationBoundary>
  );
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['main', { size: 3 }],
    queryFn: () => getGatheringData({ size: 3 }),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      seo: {
        title: '만취 - 랜딩 페이지',
      },
    },
  };
};
