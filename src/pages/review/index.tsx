/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { getReviewData } from '@/apis/getReviewData';
import HeaderSection from '@/components/main/HeaderSection';
import FilterSection from '@/components/review/FilterSection';
import MainHeader from '@/components/review/MainHeader';
import ReviewCardList from '@/components/review/ReviewCardList';
import ReviewContainer from '@/components/review/ReviewContainer';
import PaginationBtn from '@/components/shared/PaginationBtn';
import RootLayout from '@/components/shared/RootLayout';
import useGetReviewData from '@/hooks/useGetReviewData';
import useFilterStore from '@/store/useFilterStore';
import { dehydrate, QueryClient } from '@tanstack/react-query';

export default function ReviewPage() {
  const [sort, setSort] = useState<string | undefined>(undefined);
  const { page, keyword, location, category, dateStart, dateEnd } = useFilterStore();

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
    sort,
    startDate: dateStart,
    endDate: dateEnd,
  });

  return (
    <div className="mt-[60px]">
      <MainHeader />
      <RootLayout>
        <ReviewContainer>
          {/* Header (타이틀, 검색창) */}
          <HeaderSection />
          {/* 카테고리 */}
          <FilterSection sort={sort} setSort={setSort} />
          {/* 카드 */}
          <ReviewCardList data={reviewData?.data} isLoading={isLoading} isError={isError} />
          {!isLoading && !isError && reviewData?.data?.reviewContentList && reviewData.data.reviewContentList.length > 0 && (
            <div className="w-full bg-white">
              <PaginationBtn page={reviewData?.data.page ?? 0} totalPage={reviewData?.data.totalPage ?? 0} />
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
