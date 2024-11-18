import Image from 'next/image';
import type { ReviewsList } from '@/types/detail';

import Rating from '../shared/Rating';

export function ReviewListCard({ reviews }: { reviews: ReviewsList }) {
  return (
    <>
      <hr className="border-blue-100" />
      {reviews.reviewContentList.length > 0 ? (
        <article className="flex flex-col items-center pt-2">
          {reviews.reviewContentList.map((review, i) => {
            const dateObj = new Date(review.createdAt);
            const formattedDate = `${dateObj.getFullYear()}.${(dateObj.getMonth() + 1).toString().padStart(2, '0')}.${dateObj.getDate().toString().padStart(2, '0')}`;
            return (
              <div key={i} className={`border-b border-dashed border-gray-50 py-4 ${i === reviews.reviewContentList.length - 1 ? 'border-b-0' : ''}`}>
                <div className="flex w-[295px] flex-col gap-2 tablet:w-[692px] pc:w-[948px]">
                  <Rating score={review.score} />
                  <p className="text-pretty">{review.comment}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="relative size-6 rounded-full">
                        <Image
                          alt="profile"
                          src={review.profileImagePath || '/icons/person-rounded.png'}
                          fill
                          style={{ objectFit: 'cover' }}
                          className="rounded-full"
                        />
                      </div>
                      <span>{review.name}</span>
                      <span>|</span>
                    </div>
                    <span>{formattedDate}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </article>
      ) : (
        <div className="mx-auto py-6 text-center text-[#6B7280]">아직 리뷰가 없어요.</div>
      )}
    </>
  );
}
