/* eslint-disable tailwindcss/no-custom-classname */
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { getGatheringData } from '@/apis/getGatheringData';
import CardSection, { CardSkeleton, MessageWithLink } from '@/components/main/CardSection';
import EmptyState from '@/components/main/EmptyState';
import FilterSection from '@/components/main/FilterSection';
import HeaderSection from '@/components/main/HeaderSection';
import MainCarousel from '@/components/main/MainCarousel';
import MainContainer from '@/components/main/MainContainer';
import RootLayout from '@/components/shared/RootLayout';
import { FILTER_OPTIONS } from '@/constants/contants';
import useDeviceState from '@/hooks/useDeviceState';
import useGetGatheringData from '@/hooks/useGetGatheringData';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { userStore } from '@/store/userStore';
import { dehydrate, QueryClient, useQueryClient } from '@tanstack/react-query';

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

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const sentinelRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(sentinelRef);

  const deviceState = useDeviceState();

  const isLoggedIn = userStore((state) => state.isLoggedIn);
  const queryClient = useQueryClient();

  const pageSize = useMemo(() => PAGE_SIZE_BY_DEVICE[deviceState], [deviceState]);

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

  const noData = mainData?.pages[0].data.gatheringCount === 0;

  const handleCategoryClick = (selectedCategory: string) => {
    if (selectedCategory !== category) {
      setCategory(selectedCategory);
    }
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
      if (isIntersecting && hasNextPage) void fetchNextPage();
    },
    [isIntersecting, hasNextPage, fetchNextPage],
  );

  return (
    <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <MainCarousel isError={isError} />
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
          <motion.div
            ref={ref}
            style={{
              transform: isInView ? 'none' : 'translateY(10px)',
              opacity: isInView ? 1 : 0,
              transition: 'all 1s ease-in-out',
            }}
            className="mx-auto grid min-h-[200px] w-full select-none grid-cols-1 gap-6 px-4 mobile:p-0 tablet:grid-cols-3"
          >
            {isLoading
              ? Array.from({ length: pageSize }).map((_, idx) => <CardSkeleton key={idx} />)
              : mainData?.pages.map((page) => page.data.gatheringList.map((gathering) => <CardSection key={gathering.gatheringId} gathering={gathering} />))}
            {noData && <EmptyState handleCategoryClick={handleCategoryClick} />}
            {isError && (
              <div className="absolute left-1/2 w-full -translate-x-1/2">
                <MessageWithLink message="에러가 발생하였습니다." buttonText="다시 시도하기" onClick={() => window.location.reload()} />
              </div>
            )}
          </motion.div>
          {!isError && <div ref={sentinelRef} className="h-20 w-full flex-shrink-0 opacity-0" />}
        </MainContainer>
      </RootLayout>
    </motion.div>
  );
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['main'],
    queryFn: () => getGatheringData({ page: 1, size: PAGE_SIZE_BY_DEVICE.TABLET }),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
