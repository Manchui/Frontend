/* eslint-disable tailwindcss/no-custom-classname */
import Lottie from 'lottie-react';
import { getBookmarkData } from '@/apis/getBookmarkData';
import BookmarkBanner from '@/components/bookmark/BookmarkBanner';
import BookmarkCardList from '@/components/bookmark/BookmarkCardList';
import BookmarkContainer from '@/components/bookmark/BookmarkContainer';
import BookmarkFilter from '@/components/bookmark/BookmarkFilter';
import BookmarkHeader from '@/components/bookmark/BookmarkHeader';
import PaginationBtn from '@/components/shared/PaginationBtn';
import RootLayout from '@/components/shared/RootLayout';
import PAGE_SIZE_BY_DEVICE from '@/constants/pageSize';
import useDeviceState from '@/hooks/useDeviceState';
import useGetBookmarkData from '@/hooks/useGetBookmarkData';
import useFilterStore from '@/store/useFilterStore';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import Error from 'public/lottie/error.json';

export default function BookmarkPage() {
  const { page, keyword, location, category, closeDate, dateEnd, dateStart } = useFilterStore();

  const deviceState = useDeviceState();

  const {
    data: bookmark,
    isLoading,
    isError,
  } = useGetBookmarkData({
    page,
    size: PAGE_SIZE_BY_DEVICE.BOOKMARK[deviceState],
    query: keyword,
    location,
    category,
    sort: closeDate,
    startDate: dateStart,
    endDate: dateEnd,
  });

  const data = bookmark?.data;

  return (
    <>
      {isError ? (
        <div className="mt-[60px] h-bookmark-banner">
          <Lottie animationData={Error} className="size-full border-b-2 border-cardBorder bg-background" />
        </div>
      ) : (
        <BookmarkBanner isError={isError} />
      )}
      <RootLayout>
        <BookmarkContainer>
          <BookmarkHeader data={bookmark?.data} />
          <div className="min-h-screen w-full bg-white">
            <BookmarkFilter />
            <BookmarkCardList data={bookmark?.data} isLoading={isLoading} isError={isError} skeletonCount={PAGE_SIZE_BY_DEVICE.BOOKMARK[deviceState]} />
            {!isLoading && !isError && bookmark?.data.gatheringCount !== 0 && <PaginationBtn page={data?.page ?? 0} totalPage={data?.totalPage ?? 0} />}
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
