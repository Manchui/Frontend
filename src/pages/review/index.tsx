/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { getReviewData } from '@/apis/getReviewData';
import BookmarkBanner from '@/components/bookmark/BookmarkBanner';
import BookmarkContainer from '@/components/bookmark/BookmarkContainer';
import HeaderSection from '@/components/main/HeaderSection';
import FilterSection from '@/components/review/FilterSection';
import ReviewCardList from '@/components/review/ReviewCardList';
import PaginationBtn from '@/components/shared/PaginationBtn';
import RootLayout from '@/components/shared/RootLayout';
import { SEO } from '@/components/shared/SEO';
import useGetReviewData from '@/hooks/useGetReviewData';
import useInternalRouter from '@/hooks/useInternalRouter';
import useFilterStore, { useResetFilters } from '@/store/useFilterStore';
import type { DehydratedState } from '@tanstack/react-query';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import Error from 'public/lottie/error.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

type ReviewProps = {
  dehydratedState: DehydratedState;
  initialPageSize: number;
  seo: {
    title: string;
  };
};
export default function ReviewPage({ seo, dehydratedState, initialPageSize }: ReviewProps) {
  const [pageSize, setPageSize] = useState(initialPageSize);

  const { page, keyword, location, category, sort, dateEnd, dateStart } = useFilterStore();

  const router = useInternalRouter();
  const resetFilters = useResetFilters();

  const {
    data: reviewData,
    isLoading,
    isError,
    // isLoading,
  } = useGetReviewData({
    page,
    size: pageSize,
    query: keyword,
    location,
    category,
    sort,
    startDate: dateStart,
    endDate: dateEnd,
  });
  const data = reviewData?.data;

  useEffect(() => {
    if (pageSize !== 10) {
      setPageSize(10);
    }
  }, [pageSize]);

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
            {/* Header (타이틀, 검색창) */}
            <HeaderSection />
            <div className="mt-2 min-h-screen w-full rounded-t-lg bg-white">
              {/* 카테고리 */}
              <FilterSection />
              {/* 카드 */}
              <ReviewCardList data={reviewData?.data} isLoading={isLoading} isError={isError} />

              {!isLoading && !isError && reviewData?.data?.reviewContentList && reviewData.data.reviewContentList.length > 0 && (
                <PaginationBtn page={data?.page ?? 0} totalPage={data?.totalPage ?? 0} />
              )}
            </div>
          </BookmarkContainer>
        </RootLayout>
      </HydrationBoundary>
    </>
  );
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['review', 1, 10],
    queryFn: () => getReviewData({ page: 1, size: 10 }),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      seo: {
        title: '만취 - 리뷰 페이지',
      },
    },
  };
};
