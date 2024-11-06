/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useRouter } from 'next/router';
import { getReviewData } from '@/apis/getReviewData';
import FilterSection from '@/components/review/FilterSection';
import HeaderSection from '@/components/review/HeaderSection';
import MainHeader from '@/components/review/MainHeader';
import ReviewCardList from '@/components/review/ReviewCardList';
import ReviewContainer from '@/components/review/ReviewContainer';
import Pagination from '@/components/shared/pagination';
import RootLayout from '@/components/shared/RootLayout';
import { FILTER_OPTIONS } from '@/constants/contants';
import useGetReviewData from '@/hooks/useGetReviewData';
import { dehydrate, QueryClient } from '@tanstack/react-query';

export default function ReviewPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState<string | undefined>(undefined);
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(FILTER_OPTIONS[0].id);
  const [closeDate, setCloseDate] = useState<string | undefined>(undefined);
  const [dateStart, setDateStart] = useState<string | undefined>(undefined);
  const [dateEnd, setDateEnd] = useState<string | undefined>(undefined);

  const [pagesize] = useState(10);

  const {
    data: reviewData,
    isLoading,
    isError,
    // isLoading,
  } = useGetReviewData({
    page,
    size: pagesize,
    query: keyword,
    location,
    category,
    sort: closeDate,
    startDate: dateStart,
    endDate: dateEnd,
  });

  const handlePageChange = (pageValue: number) => {
    setPage(pageValue);
  };
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

  return (
    <div className="mt-[60px]">
      <MainHeader />
      <RootLayout>
        <ReviewContainer>
          {/* Header (타이틀, 검색창) */}
          <HeaderSection keyword={keyword} category={category} handleSearchSubmit={handleSearchSubmit} />
          {/* 카테고리 */}
          <FilterSection
            location={location}
            category={category}
            setDateEnd={setDateEnd}
            setLocation={setLocation}
            setDateStart={setDateStart}
            handleDateSubmit={handleDateSubmit}
            handleCategoryClick={handleCategoryClick}
            handleCloseDateClick={handleCloseDateClick}
          />
          {/* 카드 */}
          <ReviewCardList data={reviewData?.data} isLoading={isLoading} isError={isError} />
          {!isLoading && !isError && (
            <div className="bg-white w-full">
              <Pagination page={reviewData?.data.page ?? 0} totalPage={reviewData?.data.totalPage ?? 0} handlePageChange={handlePageChange} />
            </div>
          )}
        </ReviewContainer>
      </RootLayout>
    </div>
  );
}
export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['review', 1, 9],
    queryFn: () => getReviewData({ page: 1, size: 10 }),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
