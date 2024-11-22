import Image from 'next/image';
import type { ReviewsList } from '@/types/detail';

import Rating from '../shared/Rating';

export function ReviewListCard({ reviews }: { reviews: ReviewsList }) {
  return (
    <article className="mt-10 min-h-20 px-5">
      <hr className="border-blue-100" />
      {reviews.reviewContentList.length > 0 ? (
        <div className="px-6">
          {reviews.reviewContentList.map((review, i) => {
            const dateObj = new Date(review.createdAt);
            const formattedDate = `${dateObj.getFullYear()}.${(dateObj.getMonth() + 1).toString().padStart(2, '0')}.${dateObj.getDate().toString().padStart(2, '0')}`;
            return (
              <section key={i} className="border-b border-dashed border-blue-100 py-4">
                <div className="flex min-w-[295px] flex-col gap-2 font-medium">
                  <Rating score={review.score} />
                  <p className="text-pretty text-md">{review.comment}</p>
                  <div className="flex select-none items-center gap-2 text-sm">
                    <div className="relative size-6 rounded-full">
                      <Image alt="profile" src={review.profileImagePath || '/icons/person-rounded.png'} fill className="rounded-full object-cover" />
                    </div>
                    <span>{review.name}</span>
                    <span>|</span>
                    <time className="text-blue-500">{formattedDate}</time>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="mx-auto py-6 text-center text-[#6B7280]">아직 리뷰가 없어요.</div>
      )}
    </article>
  );
}
