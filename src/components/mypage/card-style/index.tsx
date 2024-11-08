import { useState } from 'react';
import getMyAttendance from '@/apis/mypage/get-mypage-attendance';
import getMyGathering from '@/apis/mypage/get-mypage-gathring';
import Loading from '@/components/detail/loading/Loading';
import { useQuery } from '@tanstack/react-query';

import { MeetingCard } from './meeting-card';
import ReviewCategory from '../category/ReviewCategory';
import MyReviewList from '../my-review-list';

export function CardComponents({ category }: { category: string }) {
  const [review, setReview] = useState('작성 가능한 리뷰');

  const { data, isError, isLoading } = useQuery({
    // NOTE: page, size는 임시값
    queryKey: ['mypage', category],
    queryFn: () => {
      if (category === '나의 모임') {
        setReview('작성 가능한 리뷰');
        return getMyAttendance();
      }
      if (category === '내가 만든 모임') {
        setReview('작성 가능한 리뷰');
        return getMyGathering();
      }
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
      {participatedList && <MeetingCard category={category} MeetingData={participatedList} />}
      {category === '나의 리뷰' && (
        <>
          <ReviewCategory category={category} review={review} setReview={setReview} />
          <MyReviewList category={category} review={review} />
        </>
      )}
      {writtenGatheringList && <MeetingCard category={category} MeetingData={writtenGatheringList} />}
    </>
  );
}
