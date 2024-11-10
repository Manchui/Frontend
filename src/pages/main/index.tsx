/* eslint-disable tailwindcss/no-custom-classname */
import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import { getGatheringData } from '@/apis/getGatheringData';
import CardSection, { CardSkeleton, MessageWithLink } from '@/components/main/CardSection';
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

import Empty from 'public/lottie/empty.json';

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
    data: mainData,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useGetGatheringData({
    page: 1,
    size: PAGE_SIZE_BY_DEVICE[deviceState],
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
    <>
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
          <div className="mx-auto grid min-h-[200px] w-full select-none grid-cols-1 gap-6 px-4 mobile:p-0 tablet:grid-cols-3">
            {isLoading
              ? Array.from({ length: PAGE_SIZE_BY_DEVICE.MOBILE }).map((_, idx) => <CardSkeleton key={idx} />)
              : mainData?.pages.map((page) => page.data.gatheringList.map((gathering) => <CardSection key={gathering.gatheringId} gathering={gathering} />))}
            {noData && (
              <div className="absolute left-1/2 w-full -translate-x-1/2">
                <Lottie animationData={Empty} className="h-empty fill-background" />
                <MessageWithLink onClick={() => handleCategoryClick('')} message="아직 등록된 모임이 없어요" buttonText="더 둘러보기" />
              </div>
            )}
            {isError && (
              <div className="absolute left-1/2 w-full -translate-x-1/2">
                <MessageWithLink message="에러가 발생하였습니다." buttonText="다시 시도하기" onClick={() => window.location.reload()} />
              </div>
            )}
          </div>
          {/* {!isError && <div ref={sentinelRef} className="h-28 w-full flex-shrink-0 opacity-0" />} */}
        </MainContainer>
      </RootLayout>
    </>
  );
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['main'],
    queryFn: () => getGatheringData({ page: 1, size: PAGE_SIZE_BY_DEVICE.PC }),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
