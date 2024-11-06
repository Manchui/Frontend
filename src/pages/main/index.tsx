import { useEffect, useRef, useState } from 'react';
import { getGatheringData } from '@/apis/getGatheringData';
import CardSection, { CardSkeleton } from '@/components/main/CardSection';
import FilterSection from '@/components/main/FilterSection';
import HeaderSection from '@/components/main/HeaderSection';
import MainCarousel from '@/components/main/MainCarousel';
import MainContainer from '@/components/main/MainContainer';
import RootLayout from '@/components/shared/RootLayout';
import { FILTER_OPTIONS } from '@/constants/contants';
import useDeviceState from '@/hooks/useDeviceState';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { userStore } from '@/store/userStore';
import type { GetGatheringResponse } from '@manchui-api';
import { dehydrate, keepPreviousData, QueryClient, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

const PAGE_SIZE_BY_DEVICE = {
  MOBILE: 3,
  TABLET: 6,
  PC: 9,
};

export default function MainPage() {
  const [keyword, setKeyword] = useState<string | undefined>(undefined);
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(FILTER_OPTIONS[0].id);
  const [closeDate, setCloseDate] = useState<string | undefined>(undefined);
  const [dateStart, setDateStart] = useState<string | undefined>(undefined);
  const [dateEnd, setDateEnd] = useState<string | undefined>(undefined);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(sentinelRef);

  const deviceState = useDeviceState();

  const isLoggedIn = userStore((state) => state.isLoggedIn);
  const queryClient = useQueryClient();

  const {
    isLoading,
    // isError,
    hasNextPage,
    fetchNextPage,
    data: mainData,
  } = useInfiniteQuery<GetGatheringResponse>({
    queryKey: [
      'main',
      {
        size: PAGE_SIZE_BY_DEVICE[deviceState],
        query: keyword,
        location,
        category,
        sort: closeDate,
        startDate: dateStart,
        endDate: dateEnd,
      },
    ],
    queryFn: ({ pageParam }) =>
      getGatheringData({
        page: pageParam as number,
        size: PAGE_SIZE_BY_DEVICE[deviceState],
        query: keyword,
        location,
        startDate: dateStart,
        endDate: dateEnd,
        sort: closeDate,
        category,
      }),
    getNextPageParam: (last) => {
      if (last?.data.totalPage > last?.data.page) {
        return last.data.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    placeholderData: keepPreviousData,
  });

  const handleCategoryClick = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  const handleSearchSubmit = (submitValue: string) => {
    setKeyword(submitValue);
  };

  const handleCloseDateClick = (value: string) => {
    setCloseDate(value);
  };

  const handleDateSubmit = ({ start, end }: { end: string; start: string }) => {
    setDateStart(start);
    setDateEnd(end);
  };

  useEffect(() => {
    if (isLoggedIn) {
      void queryClient.invalidateQueries({ queryKey: ['main'] });
    }
  }, [isLoggedIn, queryClient]);

  useEffect(
    function handleScrollFetch() {
      if (isIntersecting && hasNextPage) {
        void fetchNextPage();
      }
    },
    [isIntersecting, hasNextPage, fetchNextPage],
  );

  return (
    <>
      <MainCarousel />
      <RootLayout>
        <MainContainer>
          {/* Header (타이틀, 검색창) */}
          <HeaderSection keyword={keyword} category={category} handleSearchSubmit={handleSearchSubmit} />
          {/* 카테고리 */}
          <FilterSection
            location={location}
            category={category}
            setLocation={setLocation}
            setDateEnd={setDateEnd}
            setDateStart={setDateStart}
            handleDateSubmit={handleDateSubmit}
            handleCategoryClick={handleCategoryClick}
            handleCloseDateClick={handleCloseDateClick}
          />
          {/* 카드 */}
          <div className="mx-auto grid w-full select-none grid-cols-1 grid-rows-3 gap-6 px-4 mobile:p-0 tablet:grid-cols-3">
            {isLoading
              ? Array.from({ length: PAGE_SIZE_BY_DEVICE[deviceState] }).map((_, idx) => <CardSkeleton key={idx} />)
              : mainData?.pages.map((page) => page.data.gatheringList.map((gathering) => <CardSection key={gathering.gatheringId} gathering={gathering} />))}
          </div>
          <div ref={sentinelRef} className="h-20 w-full flex-shrink-0 opacity-0" />
        </MainContainer>
      </RootLayout>
    </>
  );
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['main'],
    queryFn: () => getGatheringData({ page: 1, size: 9 }),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
