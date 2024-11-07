import { useState } from 'react';
import getMyAttendance from '@/apis/mypage/get-mypage-attendance';
import getMyGathering from '@/apis/mypage/get-mypage-gathring';
import Loading from '@/components/detail/loading/Loading';
import { useQuery } from '@tanstack/react-query';

import { MadeMeetingCard } from './made-metting-card';
import { MeetingCard } from './meeting-card';
import ReviewCategory from '../category/ReviewCategory';
import MyReviewCategory from '../my-review-category';

export function CardComponents({ category }: { category: string }) {
  const [review, setReview] = useState('');

  const { data, isError, isLoading } = useQuery({
    // NOTE: page,size는 임시값
    queryKey: ['mypage', category],
    queryFn: () => {
      if (category === '나의 모임') return getMyAttendance();
      if (category === '내가 만든 모임') return getMyGathering();
      return null;
    },
    staleTime: 1000 * 10,
  });

  const participatedList = data?.participatedGatheringList;
  const writtenGatheringList = data?.writtenGatheringList;

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
    <>
      {category === '나의 리뷰' && <ReviewCategory category={category} review={review} setReview={setReview} />}
      <div className="grid grid-cols-1 px-1 phablet:grid-cols-2 tablet:grid-cols-1 pc:grid-cols-1">
        {participatedList?.content.map((list, i) => <MeetingCard key={i} MeetingData={list} />)}
        {writtenGatheringList?.content.map((list, i) => <MadeMeetingCard key={i} MeetingData={list} />)}
        {category === '나의 리뷰' && <MyReviewCategory category={category} review={review} />}
      </div>
    </>
  );
}
