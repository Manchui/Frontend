import getMyReviewable from '@/apis/mypage/get-mypage-reviewable';
import getMyReviews from '@/apis/mypage/get-mypage-reviews';
import Loading from '@/components/detail/loading/Loading';
import { useQuery } from '@tanstack/react-query';

import { MeetingCard } from '../card-style/meeting-card';
import { ReviewableCard } from '../card-style/reviewable-card';

export default function MyReviewList({ category, review }: { category: string; review: string }) {
  const isReview = category === '나의 리뷰' && review === '작성 가능한 리뷰';

  const { data, isError, isLoading } = useQuery({
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

  if (isLoading) return <Loading />;
  if (isError) return <div>Error</div>;

  if (reviewableList?.content.length === 0 && isReview) {
    return <div className="py-72 text-center text-lg text-[#6B7280]">{isReview ? '아직 작성 가능한 리뷰가 없어요' : '아직 작성한 리뷰가 없어요'}</div>;
  }

  return (
    <div>{reviewableList && (isReview ? <MeetingCard MeetingData={reviewableList} category={review} /> : <ReviewableCard MeetingData={reviewableList} />)}</div>
  );
}
