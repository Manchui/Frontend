import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Rating from '@/components/shared/Rating';
import type { GetReviewResponse } from '@manchui-api';

import MoreButton from './MoreButton';

type ReviewCardSProps = {
  review: GetReviewResponse['data']['reviewContentList'][number];
};

export function ReviewCard({ review }: ReviewCardSProps) {
  const dateObj = new Date(review.createdAt);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const commentRef = useRef<HTMLParagraphElement | null>(null);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const formattedDate = `${dateObj.getFullYear()}.${(dateObj.getMonth() + 1).toString().padStart(2, '0')}.${dateObj.getDate().toString().padStart(2, '0')}`;

  // 더보기 버튼 clamp-1에 따라 생기게
  const checkClamped = () => {
    if (commentRef.current) {
      const isClamped = commentRef.current.scrollHeight > commentRef.current.clientHeight;
      setShowMoreButton(isClamped);
    }
  };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      checkClamped();

      const handleResize = () => {
        checkClamped();
        setIsExpanded(false);
      };

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }
    return undefined;
  }, [review.comment]);

  return (
    <Link
      href={`/detail/${review.gatheringId}`}
      className={`w-[280px] flex-col items-start gap-4 tablet:flex tablet:w-full tablet:flex-row group${isExpanded ? 'border-b-2 border-dashed border-gray-50' : ''}`}
    >
      <div className="h-[156px] w-[280px] min-w-[280px] overflow-hidden rounded-lg ">
        {review.gatheringImage ? (
          <Image
            alt="testImage"
            src={review.gatheringImage}
            width={280}
            height={156}
            className="size-full transform object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
        ) : (
          <div className="relative flex-shrink-0 overflow-hidden rounded-lg bg-gray-200" />
        )}
      </div>

      <div
        className={`flex flex-grow flex-col items-start justify-start gap-2 pt-4 tablet:min-h-[156px] tablet:pt-0 ${isExpanded ? '' : 'border-b-2 border-dashed border-gray-50'}`}
      >
        <div className="-mb-1 flex w-full items-start justify-between">
          {/* <Rating score={review.score} /> */}
          <div className="flex w-full flex-col items-start gap-1 text-lg font-semibold text-blue-900 tablet:flex-row">
            <span>
              {review.category} | {review.groupName}
            </span>
            <div className="flex gap-1">
              <span className="hidden tablet:flex"> &bull;</span>
              <span className="-mt-1 text-sm text-blue-500 tablet:mt-0 tablet:text-lg tablet:text-blue-900">{review.location}</span>
            </div>
          </div>
        </div>

        {/* <div className="flex w-full items-center gap-1 text-sm font-semibold text-blue-900 -mt-1 ">
          <span>{review.groupName}</span>
          <span> &bull;</span>
          <span>{review.location}</span>
        </div> */}
        <Rating score={review.score} />

        <div className="flex w-full flex-col items-start pt-1">
          <p ref={commentRef} className={`text-pretty break-all text-sm font-medium ${isExpanded ? '' : 'line-clamp-none tablet:line-clamp-2'}`}>
            {review.comment}
            {!isExpanded && showMoreButton && '...'}
          </p>
          {showMoreButton && <MoreButton isExpanded={isExpanded} onClick={toggleExpand} />}
          {/* <p ref={commentRef} className={`text-pretty break-all text-sm font-medium ${isExpanded ? '' : 'line-clamp-1'}`}>
            {review.comment}
            {!isExpanded && showMoreButton && '...'}
          </p>
          {showMoreButton && <MoreButton isExpanded={isExpanded} onClick={toggleExpand} />} */}
        </div>
        <div className="flex items-center gap-2 text-xs font-medium pb-2 tablet:pb-0">
          <div className="relative">
            <Image
              alt="profile"
              src={review.profileImagePath ? review.profileImagePath : 'images/profile.svg'}
              width={24}
              height={24}
              style={{ objectFit: 'cover' }}
              className="size-6 rounded-full"
            />
          </div>
          <span className="text-blue-700">{review.name}</span>
          <span>|</span>
          <span className="text-blue-500">{formattedDate}</span>
        </div>
      </div>
    </Link>
  );
}
