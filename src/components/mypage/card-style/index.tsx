import getMyAttendance from '@/apis/mypage/get-mypage-attendance';
import getMyGathering from '@/apis/mypage/get-mypage-gathring';
import Loading from '@/components/detail/loading/Loading';
import { useQuery } from '@tanstack/react-query';

import { MadeMeetingCard } from './made-metting-card';
import { MeetingCard } from './meeting-card';

export function CardComponents({ category }: { category: string }) {
  const { data, isError, isLoading } = useQuery({
    // NOTE: page,size는 임시값
    queryKey: ['mypage', category],
    queryFn: () => {
      if (category === '나의 모임' || localStorage.getItem('my-category') === '나의 모임') return getMyAttendance();
      if (category === '나의 리뷰' || localStorage.getItem('my-category') === '나의 리뷰') return null;
      if (category === '내가 만든 모임' || localStorage.getItem('my-category') === '내가 만든 모임') return getMyGathering();
      return null;
    },
    staleTime: 1000 * 10,
  });
  const participatedList = data?.participatedGatheringList;
  const writtenGatheringList = data?.writtenGatheringList;

  if (isLoading) return <Loading />;
  if (isError) return <Loading />;

  return (
    <div className="grid grid-cols-1 px-1 phablet:grid-cols-2 tablet:grid-cols-1 pc:grid-cols-1">
      {participatedList?.content.map((list, i) => <MeetingCard key={i} MeetingData={list} />)}
      {writtenGatheringList?.content.map((list, i) => <MadeMeetingCard key={i} MeetingData={list} />)}
    </div>
  );
}
