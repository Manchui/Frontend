import type { GatheringList } from '@/types/mypage';

export function ReviewableCard({ review }: { review: GatheringList }) {
  return <div>데이터 없음 {review.deletedAt}</div>;
}
