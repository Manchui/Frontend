import getMyReviewable from '@/apis/mypage/get-mypage-reviewable';
import getMyReviews from '@/apis/mypage/get-mypage-reviews';
import Loading from '@/components/detail/loading/Loading';
import { useQuery } from '@tanstack/react-query';

import { MeetingCard } from '../card-style/meeting-card';
import { ReviewableCard } from '../card-style/reviewable-card';

export default function MyReviewList({ category, review }: { category: string; review: string }) {
  const { data, isError, isLoading } = useQuery({
    // NOTE: page,size는 임시값
    queryKey: ['mypage', category, review],
    queryFn: () => {
      if (category === '나의 리뷰' && review === '작성 가능한 리뷰') return getMyReviewable();
      // if (category === '나의 리뷰' && review === '작성한 리뷰') return getMyReviews();
      return null;
    },
    staleTime: 1000 * 10,
  });

  const reviewableList = data?.reviewableList;
  console.log('reviewableList: ', reviewableList);
  console.log('reviewableList-content: ', reviewableList?.content);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error</div>;

  if (reviewableList?.content.length === 0) {
    return <div className="py-72 text-center text-lg text-[#6B7280]">아직 작성 가능한 리뷰가 없어요</div>;
  }

  return (
    <div>
      {/* <div> {reviewableList?.content.map((list, i) => <ReviewableCard key={i} review={list} />)}</div> */}
      <div> {reviewableList && <MeetingCard MeetingData={reviewableList} category={review} />}</div>
    </div>
  );
}
