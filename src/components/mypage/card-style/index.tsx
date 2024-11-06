import getMyAttendance from '@/apis/mypage/get-mypage-attendance';
import getMyGathering from '@/apis/mypage/get-mypage-gathring';
import getMyReviewable from '@/apis/mypage/get-mypage-reviewable';
import getMyReviews from '@/apis/mypage/get-mypage-reviews';
import Loading from '@/components/detail/loading/Loading';
import { useQuery } from '@tanstack/react-query';

import { MadeMeetingCard } from './made-metting-card';
import { MeetingCard } from './meeting-card';
// import { ReviewableCard } from './reviewable-card';

export function CardComponents({ category, review }: { category: string; review: string }) {
  const { data, isError, isLoading } = useQuery({
    // NOTE: page,size는 임시값
    queryKey: ['mypage', category],
    queryFn: () => {
      if (category === '나의 모임' && localStorage.getItem('my-category') === '나의 모임') return getMyAttendance();
      if (
        category === '나의 리뷰' &&
        review === '작성 가능한 리뷰' &&
        localStorage.getItem('my-category') === '나의 리뷰' &&
        localStorage.getItem('my-review') === '작성 가능한 리뷰'
      )
        return getMyReviewable();
      if (
        category === '나의 리뷰' &&
        review === '작성한 리뷰' &&
        localStorage.getItem('my-category') === '나의 리뷰' &&
        localStorage.getItem('my-review') === '작성한 리뷰'
      )
        return getMyReviews();
      if (category === '내가 만든 모임' && localStorage.getItem('my-category') === '내가 만든 모임') return getMyGathering();
      return null;
    },
    staleTime: 1000 * 10,
  });
  const participatedList = data?.participatedGatheringList;
  const writtenGatheringList = data?.writtenGatheringList;
  console.log(data);
  if (isLoading) return <Loading />;
  if (isError) return <div>Error</div>;

  const renderEmptyState = (message: string) => <div className="py-72 text-center text-lg text-[#6B7280]">{message}</div>;

  if (participatedList?.content.length === 0) {
    return renderEmptyState('아직 신청한 모임이 없어요');
  }
  if (writtenGatheringList?.content.length === 0) {
    return renderEmptyState('아직 만든 모임이 없어요');
  }

  return (
    <div className="grid grid-cols-1 px-1 phablet:grid-cols-2 tablet:grid-cols-1 pc:grid-cols-1">
      {participatedList?.content.map((list, i) => <MeetingCard key={i} MeetingData={list} />)}
      {writtenGatheringList?.content.map((list, i) => <MadeMeetingCard key={i} MeetingData={list} />)}
      {/* <ReviewableCard review={review} /> */}
    </div>
  );
}
