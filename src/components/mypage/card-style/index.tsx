import { useState } from 'react';
import Lottie from 'lottie-react';
import getMyAttendance from '@/apis/mypage/get-mypage-attendance';
import getMyGathering from '@/apis/mypage/get-mypage-gathring';
import { MessageWithLink } from '@/components/main/CardSection';
import { useQuery } from '@tanstack/react-query';

import { MeetingCard } from './meeting-card';
import ReviewCategory from '../category/ReviewCategory';
import MyReviewList from '../my-review-list';

import Empty from 'public/lottie/empty.json';

export function CardComponents({ category }: { category: string }) {
  const [review, setReview] = useState('작성 가능한 리뷰');

  const { data } = useQuery({
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

  const renderEmptyState = (message: string) => (
    <div className="py-20">
      <div className="absolute left-1/2 w-full -translate-x-1/2">
        <Lottie animationData={Empty} className="h-empty fill-white" />
        <MessageWithLink message={message} buttonText="모임 둘러보기" />
      </div>
    </div>
  );

  if (participatedList?.content.length === 0) {
    return renderEmptyState('아직 신청한 모임이 없어요.');
  }
  if (writtenGatheringList?.content.length === 0) {
    return renderEmptyState('아직 만든 모임이 없어요.');
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
