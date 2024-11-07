import getMyReviewable from '@/apis/mypage/get-mypage-reviewable';
import getMyReviews from '@/apis/mypage/get-mypage-reviews';
import Loading from '@/components/detail/loading/Loading';
import { useQuery } from '@tanstack/react-query';

export default function MyReviewCategory({ category, review }: { category: string; review: string }) {
  const { data, isError, isLoading } = useQuery({
    // NOTE: page,size는 임시값
    queryKey: ['mypage', category],
    queryFn: () => {
      if (
        (category === '나의 리뷰' && review === '작성 가능한 리뷰') ||
        (localStorage.getItem('my-category') === '나의 리뷰' && localStorage.getItem('my-review') === '작성 가능한 리뷰')
      )
        return getMyReviewable();
      if (
        (category === '나의 리뷰' && review === '작성한 리뷰') ||
        (localStorage.getItem('my-category') === '나의 리뷰' && localStorage.getItem('my-review') === '작성한 리뷰')
      )
        return getMyReviews();
      return null;
    },
    staleTime: 1000 * 10,
  });
  const reviewableList = data?.reviewableList;
  if (isLoading) return <Loading />;
  if (isError) return <div>Error</div>;
  if (reviewableList?.content.length === 0) {
    return <div className="py-72 text-center text-lg text-[#6B7280]">아직 작성 가능한 리뷰가 없어요</div>;
  }
  return (
    <div className="grid grid-cols-1 px-1 phablet:grid-cols-2 tablet:grid-cols-1 pc:grid-cols-1">
      {/* <div> {reviewableList?.content.map((list, i) => <ReviewableCard key={i} review={list} />)}</div> */}
      eeee
    </div>
  );
}
