/* eslint-disable tailwindcss/no-custom-classname */
import { useEffect, useMemo, useRef, useState } from 'react';
import { getGatheringData } from '@/apis/getGatheringData';
import FilterSection from '@/components/main/FilterSection';
import HeaderSection from '@/components/main/HeaderSection';
import MainCardSection from '@/components/main/MainCardSection';
import MainCarousel from '@/components/main/MainCarousel';
import MainContainer from '@/components/main/MainContainer';
import RootLayout from '@/components/shared/RootLayout';
import { SEO } from '@/components/shared/SEO';
import PAGE_SIZE_BY_DEVICE from '@/constants/pageSize';
import useDeviceState from '@/hooks/useDeviceState';
import useGetGatheringData from '@/hooks/useGetGatheringData';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useFilterStore from '@/store/useFilterStore';
import { userStore } from '@/store/userStore';
import type { DehydratedState } from '@tanstack/react-query';
import { dehydrate, HydrationBoundary, QueryClient, useQueryClient } from '@tanstack/react-query';

interface MainPageProps {
  dehydratedState: DehydratedState;
  initialPageSize: number;
  seo: {
    title: string;
  };
}

export default function MainPage({ seo, dehydratedState, initialPageSize }: MainPageProps) {
  const { keyword, location, category, closeDate, dateStart, dateEnd } = useFilterStore();
  const [pageSize, setPageSize] = useState(initialPageSize);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(sentinelRef);

  const deviceState = useDeviceState();

  const isLoggedIn = userStore((state) => state.isLoggedIn);
  const queryClient = useQueryClient();

  const {
    data: mainData,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useGetGatheringData({
    page: 1,
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
    if (pageSize !== PAGE_SIZE_BY_DEVICE.MAIN[deviceState]) {
      setPageSize(PAGE_SIZE_BY_DEVICE.MAIN[deviceState]);
    }
  }, [deviceState, pageSize]);

  return (
    <>
      <SEO title={seo.title} />
      <HydrationBoundary state={dehydratedState}>
        <MainCarousel isError={isError} mainData={mainDataList} />
        <RootLayout>
          <MainContainer>
            <HeaderSection />
            <FilterSection />
            <MainCardSection isError={isError} isLoading={isLoading} pageSize={pageSize} mainData={mainDataList} />
            {!isError && <div ref={sentinelRef} className="h-20 w-full flex-shrink-0 opacity-0" />}
          </MainContainer>
        </RootLayout>
      </HydrationBoundary>
    </>
  );
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  const initialPageSize = PAGE_SIZE_BY_DEVICE.MAIN.PC;

  const request = { page: 1, size: initialPageSize };

  await queryClient.prefetchQuery({
    queryKey: ['main', { page: 1 }],
    queryFn: () => getGatheringData(request),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      seo: {
        title: '만취 - 랜딩 페이지',
      },
      initialPageSize,
    },
  };
};
