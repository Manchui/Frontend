import getGatheringData from '@/apis/detail/get-gathering-data';
import { FloatingBar } from '@/components/detail/FloatingBar';
import { GatheringCard } from '@/components/detail/GatheringCard';
import { ReviewListCard } from '@/components/detail/ReviewListCard';
import Score from '@/components/detail/score';
import RootLayout from '@/components/shared/RootLayout';
import { SEO } from '@/components/shared/SEO';
import type { DetailData } from '@/types/detail';
import type { DehydratedState } from '@tanstack/react-query';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

interface DetailPageProps {
  dehydratedState: DehydratedState;
  gatherings: DetailData;
  isId: number;
  seo: {
    title: string;
  };
}

export default function DetailPage({ seo, dehydratedState, gatherings, isId }: DetailPageProps) {
  return (
    <>
      <SEO title={seo.title} />
      <HydrationBoundary state={dehydratedState}>
        <RootLayout>
          <div className="bg-white pb-[90px] pt-[60px]">
            <GatheringCard gatherings={gatherings} />
            <Score reviewsList={gatherings.reviewsList} />
            <ReviewListCard reviews={gatherings.reviewsList} />
            <FloatingBar id={isId} gatherings={gatherings} usersList={gatherings.usersList} maxUsers={gatherings.maxUsers} />
          </div>
        </RootLayout>
      </HydrationBoundary>
    </>
  );
}

export const getServerSideProps = async (context: { params: { id: number } }) => {
  const queryClient = new QueryClient();
  const { id } = context.params;

  const gatherings = await getGatheringData(id);

  await queryClient.prefetchQuery({
    queryKey: ['detail', { id, page: 1, size: 10 }],
    queryFn: () => gatherings,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      seo: {
        title: '상세 페이지',
      },
      gatherings,
      isId: id,
    },
  };
};
