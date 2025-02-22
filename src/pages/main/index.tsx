import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { getGatheringData } from '@/apis/getGatheringData';
import { CardSkeleton } from '@/components/main/CardSection';
import { CarouselSkeleton } from '@/components/main/Carousel';
import HeaderSection from '@/components/main/HeaderSection';
import RootLayout from '@/components/shared/RootLayout';
import { SEO } from '@/components/shared/SEO';
import useInternalRouter from '@/hooks/useInternalRouter';
import { useResetFilters } from '@/store/useFilterStore';
import { dehydrate, QueryClient } from '@tanstack/react-query';

const Carousel = dynamic(() => import('@/components/main/Carousel'), { loading: () => <CarouselSkeleton />, ssr: false });
const CardSection = dynamic(() => import('@/components/main/CardSection'), { loading: () => <CardSkeleton />, ssr: true });

interface MainPageProps {
  seo: {
    title: string;
  };
}

export default function MainPage({ seo }: MainPageProps) {
  const router = useInternalRouter();

  const resetFilters = useResetFilters();

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
      <Carousel />
      <RootLayout>
        <HeaderSection />
        <CardSection />
      </RootLayout>
    </>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['main', {}],
    queryFn: () => getGatheringData({ size: 8 }),
    initialPageParam: undefined,
  });

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      seo: {
        title: '만취 - 랜딩 페이지',
      },
    },
  };
}
