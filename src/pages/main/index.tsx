import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getGatheringData } from '@/apis/getGatheringData';
import CardSection from '@/components/main/CardSection';
import FilterSection from '@/components/main/FilterSection';
import HeaderSection from '@/components/main/HeaderSection';
import MainCarousel from '@/components/main/MainCarousel';
import MainContainer from '@/components/main/MainContainer';
import RootLayout from '@/components/shared/RootLayout';
import { FILTER_OPTIONS } from '@/constants/main/contants';
import { dehydrate, keepPreviousData, QueryClient, useQuery } from '@tanstack/react-query';

export default function MainPage() {
  const router = useRouter();

  const [page] = useState<number>(Number(router.query.page) || 1);
  const [keyword, setKeyword] = useState<string | undefined>((router.query.keyword as string | undefined) || undefined);
  const [region, setRegion] = useState<string | undefined>((router.query.category as string | undefined) || undefined);
  const [category, setCategory] = useState<string | undefined>((router.query.category as string | undefined) || FILTER_OPTIONS[0].id);
  const [closeDate, setCloseDate] = useState<string | undefined>(undefined);

  const [dateStart, setDateStart] = useState<string | undefined>(undefined);
  const [dateEnd, setDateEnd] = useState<string | undefined>(undefined);

  const { data: mainData, refetch } = useQuery({
    queryKey: ['main', { query: keyword, location: region, category, sort: closeDate, startDate: dateStart, endDate: dateEnd }],
    queryFn: () =>
      getGatheringData({
        page,
        size: 10,
        query: keyword,
        location: region,
        startDate: dateStart,
        endDate: dateEnd,
        sort: closeDate,
        category,
      }),
    placeholderData: keepPreviousData,
  });

  console.log(mainData?.data);

  const gatheringData = mainData?.data.gatheringList;

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
    const token = localStorage.getItem('accessToken');

    if (token) {
      refetch().catch(console.error);
    }
  }, [refetch]);

  return (
    <>
      <MainCarousel />
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
          <div className="mx-auto grid w-full select-none grid-cols-1 grid-rows-3 gap-6 px-4 mobile:p-0 tablet:grid-cols-3">
            {gatheringData?.map((gathering) => <CardSection key={gathering.gatheringId} gathering={gathering} />)}
          </div>
        </MainContainer>
      </RootLayout>
    </>
  );
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['main'],
    queryFn: () => getGatheringData({}),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
