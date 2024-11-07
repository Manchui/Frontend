/* eslint-disable tailwindcss/no-custom-classname */
import { useState } from 'react';
import { getBookmarkData } from '@/apis/getBookmarkData';
import BookmarkBanner from '@/components/bookmark/BookmarkBanner';
import BookmarkCardList from '@/components/bookmark/BookmarkCardList';
import BookmarkContainer from '@/components/bookmark/BookmarkContainer';
import BookmarkFilter from '@/components/bookmark/BookmarkFilter';
import BookmarkHeader from '@/components/bookmark/BookmarkHeader';
import PaginationBtn from '@/components/shared/PaginationBtn';
import RootLayout from '@/components/shared/RootLayout';
import { FILTER_OPTIONS } from '@/constants/contants';
import useDeviceState from '@/hooks/useDeviceState';
import useGetBookmarkData from '@/hooks/useGetBookmarkData';
import { dehydrate, QueryClient } from '@tanstack/react-query';

const PAGE_SIZE_BY_DEVICE = {
  MOBILE: 2,
  TABLET: 4,
  PC: 6,
};

export default function BookmarkPage() {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState<string | undefined>(undefined);
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(FILTER_OPTIONS[0].id);
  const [closeDate, setCloseDate] = useState<string | undefined>(undefined);
  const [dateStart, setDateStart] = useState<string | undefined>(undefined);
  const [dateEnd, setDateEnd] = useState<string | undefined>(undefined);

  const deviceState = useDeviceState();

  const {
    data: bookmark,
    isLoading,
    isError,
  } = useGetBookmarkData({
    page,
    size: PAGE_SIZE_BY_DEVICE[deviceState],
    query: keyword,
    location,
    category,
    sort: closeDate,
    startDate: dateStart,
    endDate: dateEnd,
  });

  const data = bookmark?.data;

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
    <>
      <BookmarkBanner />
      <RootLayout>
        <BookmarkContainer>
          <BookmarkHeader data={bookmark?.data} handleSearchSubmit={handleSearchSubmit} />
          <div className="w-full bg-white">
            <BookmarkFilter
              location={location}
              category={category}
              setDateEnd={setDateEnd}
              setLocation={setLocation}
              setDateStart={setDateStart}
              handleDateSubmit={handleDateSubmit}
              handleCategoryClick={handleCategoryClick}
              handleCloseDateClick={handleCloseDateClick}
            />
            <BookmarkCardList data={bookmark?.data} isLoading={isLoading} isError={isError} skeletonCount={PAGE_SIZE_BY_DEVICE[deviceState]} />
            {!isLoading && !isError && <PaginationBtn page={data?.page ?? 0} totalPage={data?.totalPage ?? 0} handlePageChange={handlePageChange} />}
          </div>
        </BookmarkContainer>
      </RootLayout>
    </>
  );
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['bookmark', 1, 9],
    queryFn: () => getBookmarkData({ page: 1, size: 9 }),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
