import Image from 'next/image';
import type { ReviewList } from '@/types/detail';

import Rating from '../shared/Rating';

export function ReviewListCard({ review }: { review: ReviewList }) {
  const dateObj = new Date(review.createdAt);
  const formattedDate = `${dateObj.getFullYear()}.${(dateObj.getMonth() + 1).toString().padStart(2, '0')}.${dateObj.getDate().toString().padStart(2, '0')}`;

  return (
    <div className="flex w-[295px] flex-col gap-2 tablet:w-[692px] pc:w-[948px]">
      <Rating score={review.score} />
      <p className="text-pretty">{review.comment}</p>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="relative size-6 rounded-full">
            <Image alt="profile" src={review.profileImagePath} fill style={{ objectFit: 'cover' }} className="rounded-full" />
          </div>
          {/* 닉네임을 백엔드에서 추가해야 할 듯 */}
          <span>{review.name}</span>
          <span>|</span>
        </div>
        <span>{formattedDate}</span>
      </div>
    </div>
  );
}
