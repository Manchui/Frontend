import Lottie from 'lottie-react';
import getMyReviewable from '@/apis/mypage/get-mypage-reviewable';
import getMyReviews from '@/apis/mypage/get-mypage-reviews';
import { MessageWithLink } from '@/components/main/CardSection';
import { useQuery } from '@tanstack/react-query';

import { MeetingCard } from '../card-style/meeting-card';
import { ReviewableCard } from '../card-style/reviewable-card';

import Empty from 'public/lottie/empty.json';

export default function MyReviewList({ category, review }: { category: string; review: string }) {
  const isReview = category === '나의 리뷰' && review === '작성 가능한 리뷰';

  const { data } = useQuery({
    // NOTE: page,size는 임시값
    queryKey: ['mypage', category, review],
    queryFn: () => {
      if (isReview) return getMyReviewable();
      if (!isReview) return getMyReviews();
      return null;
    },
    staleTime: 1000 * 10,
  });
  const reviewableList = data?.reviewableList;

  if (reviewableList?.content.length === 0) {
    return (
      <div className="py-3">
        <div className="absolute left-1/2 w-full -translate-x-1/2">
          <Lottie animationData={Empty} className="h-empty fill-white" />
          <MessageWithLink message={isReview ? '아직 작성 가능한 리뷰가 없어요.' : '아직 작성한 리뷰가 없어요.'} buttonText="모임 둘러보기" />
        </div>
      </div>
    );
  }

  return (
    <div>{reviewableList && (isReview ? <MeetingCard MeetingData={reviewableList} category={review} /> : <ReviewableCard MeetingData={reviewableList} />)}</div>
  );
}
