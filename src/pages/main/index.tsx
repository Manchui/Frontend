/* eslint-disable tailwindcss/no-custom-classname */
import { useEffect, useMemo, useRef } from 'react';
import { getGatheringData } from '@/apis/getGatheringData';
import FilterSection from '@/components/main/FilterSection';
import HeaderSection from '@/components/main/HeaderSection';
import MainCardSection from '@/components/main/MainCardSection';
import MainCarousel from '@/components/main/MainCarousel';
import MainContainer from '@/components/main/MainContainer';
import RootLayout from '@/components/shared/RootLayout';
import PAGE_SIZE_BY_DEVICE from '@/constants/pageSize';
import useDeviceState from '@/hooks/useDeviceState';
import useGetGatheringData from '@/hooks/useGetGatheringData';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useFilterStore from '@/store/useFilterStore';
import { userStore } from '@/store/userStore';
import { dehydrate, QueryClient, useQueryClient } from '@tanstack/react-query';

export default function MainPage() {
  const { keyword, location, category, closeDate, dateStart, dateEnd } = useFilterStore();

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

  return (
    <>
      <MainCarousel isError={isError} />
      <RootLayout>
        <MainContainer>
          <HeaderSection />
          <FilterSection />
          <MainCardSection isError={isError} isLoading={isLoading} pageSize={pageSize} mainData={mainDataList} />
          {!isError && <div ref={sentinelRef} className="h-20 w-full flex-shrink-0 opacity-0" />}
        </MainContainer>
      </RootLayout>
    </>
  );
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['main'],
    queryFn: () => getGatheringData({ page: 1, size: PAGE_SIZE_BY_DEVICE.MAIN.TABLET }),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
