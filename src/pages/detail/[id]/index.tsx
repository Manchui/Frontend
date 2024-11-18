import { useState } from 'react';
import { useRouter } from 'next/router';
import getGatheringData from '@/apis/detail/get-gathering-data';
import { FloatingBar } from '@/components/detail/FloatingBar';
import { GatheringCard } from '@/components/detail/GatheringCard';
import { ReviewListCard } from '@/components/detail/ReviewListCard';
import Score from '@/components/detail/score';
import RootLayout from '@/components/shared/RootLayout';
import { useQuery } from '@tanstack/react-query';

export default function DetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [isId, setIsId] = useState('');
  const { data } = useQuery({
    // NOTE: page,size는 임시값
    queryKey: ['detail', { id, page: 1, size: 10 }],
    queryFn: () => {
      if (typeof id === 'string') {
        setIsId(id);
        return getGatheringData(id);
      }
      return null;
    },
    staleTime: 1000 * 10,
  });
  if (!data) return null;
  const gatherings = data;

  return (
    <main className="pb-[80px] pt-[60px]">
      <RootLayout>
        <GatheringCard gatherings={gatherings} />

        <div className="px-4 tablet:px-10 pc:px-5">
          <Score reviewsList={gatherings.reviewsList} />
          <section className="mt-6 min-h-20 tablet:mt-9 pc:mt-10">{gatherings.reviewsList && <ReviewListCard reviews={gatherings.reviewsList} />}</section>
        </div>
        <FloatingBar id={isId} gatherings={gatherings} usersList={gatherings.usersList} maxUsers={gatherings.maxUsers} />
      </RootLayout>
    </main>
  );
}
