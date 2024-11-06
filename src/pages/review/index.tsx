/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getReviewData } from '@/apis/getReviewData';
import FilterSection from '@/components/review/FilterSection';
import HeaderSection from '@/components/review/HeaderSection';
import MainHeader from '@/components/review/HeaderSection/MainHeader';
import { ReviewCard } from '@/components/review/ReviewCard';
import MainContainer from '@/components/review/ReviewContainer';
import Pagination from '@/components/shared/pagination';
import RootLayout from '@/components/shared/RootLayout';
import { FILTER_OPTIONS } from '@/constants/contants';
import type { GetReviewResponse } from '@manchui-api';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

type ReviewType = {
  ImagePath: string;
  comment: string;
  createdAt: string;
  gatheringLocation: string;
  gatheringName: string;
  name: string;
  profileImagePath: string;
  score: number;
  userId: string;
};

export default function ReviewPage() {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string | undefined>((router.query.keyword as string | undefined) || undefined);
  const [region, setRegion] = useState<string | undefined>((router.query.category as string | undefined) || undefined);
  const [category, setCategory] = useState<string | undefined>((router.query.category as string | undefined) || FILTER_OPTIONS[0].id);
  const [closeDate, setCloseDate] = useState<string | undefined>(undefined);
  const [dateStart, setDateStart] = useState<string | undefined>(undefined);
  const [dateEnd, setDateEnd] = useState<string | undefined>(undefined);

  const [, setData] = useState<ReviewType[]>([]);
  const [page, setPage] = useState(0);
  const [pagesize] = useState(10);
  const [totalPage, setTotalPage] = useState(0);

  const {
    data: reviewData,

    // isLoading,
  } = useQuery<GetReviewResponse>({
    queryKey: [
      'review',
      {
        size: pagesize,
        query: keyword,
        location: region,
        category,
        sort: closeDate,
        startDate: dateStart,
        endDate: dateEnd,
      },
    ],
    queryFn: ({ pageParam = 0 }) =>
      getReviewData({
        page: (pageParam as number) + 1,
        size: pagesize,
        query: keyword,
        location: region,
        startDate: dateStart,
        endDate: dateEnd,
        sort: closeDate,
        category,
      }),
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

  // const fetchData = (page: number, size: number) => {
  //   const start = page * size;
  //   const end = start + size;
  //   const slicedData = mockData.slice(start, end);

  //   setData(slicedData);
  //   setTotalPage(Math.ceil(mockData.length / size));
  // };

  // useEffect(() => {
  //   fetchData(page, pagesize);
  // }, [page, pagesize]);

  return (
    <div className="mt-[60px]">
      <MainHeader />
      <RootLayout>
        <MainContainer>
          {/* Header (타이틀, 검색창) */}
          <HeaderSection keyword={keyword} category={category} handleSearchSubmit={handleSearchSubmit} />

          {/* 카테고리 */}
          <FilterSection
            region={region}
            category={category}
            setRegion={setRegion}
            setDateEnd={setDateEnd}
            setDateStart={setDateStart}
            handleDateSubmit={handleDateSubmit}
            handleCategoryClick={handleCategoryClick}
            handleCloseDateClick={handleCloseDateClick}
          />
          {/* 카드 */}
          <section className="mt-0 flex w-full flex-col items-center gap-6 bg-white px-4 pb-6 pt-1 mobile:rounded-lg tablet:items-start">
            {reviewData?.data.reviewContentList.map((reviewContent) => <ReviewCard key={reviewContent.reviewId} review={reviewContent} />)}

            <div className="flex self-center">
              <Pagination
                page={page}
                totalPage={totalPage}
                setPage={setPage}
                // 임시
              />
            </div>
            {!reviewData && <div className="h-20 w-full">작성된 리뷰가 없습니다.</div>}
          </section>
        </MainContainer>
      </RootLayout>
    </div>
  );
}
