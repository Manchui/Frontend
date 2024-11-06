import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
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
    <div className="w-[280px] flex-col items-start gap-4 tablet:flex tablet:w-full tablet:flex-row">
      
      {review.gatheringImage ? (
        <Image
          alt="testImage"
          src={review.gatheringImage}
          width={280}
          height={156}
          style={{ width: '280px', height: '156px', objectFit: 'cover' }}
          className="relative mx-auto flex-shrink-0 overflow-hidden rounded-lg"
        />
      ) : (
        <div className="relative mx-auto h-[156px] w-[280px] flex-shrink-0 overflow-hidden rounded-lg bg-gray-200" />
      )}
      <div className="flex flex-grow flex-col items-start justify-start gap-2 border-b-2 border-dashed border-gray-50 pt-4 tablet:min-h-[156px] tablet:pt-0">
        <Rating score={review.score} />
        <div className="flex w-full flex-col items-start">
          <p ref={commentRef} className={`text-pretty break-all text-sm font-medium ${isExpanded ? '' : 'line-clamp-1'}`}>
            {review.comment}
            {!isExpanded && showMoreButton && '...'}
          </p>
          {showMoreButton && <MoreButton isExpanded={isExpanded} onClick={toggleExpand} />}
        </div>
        <div className="flex w-full items-center gap-1 text-xs font-medium text-blue-700">
          <span>{review.groupName}</span>
          <span> &bull;</span>
          <span>{review.location}</span>
        </div>
        <div className="mb-3 flex items-center gap-2 text-xs font-medium">
          <div className="relative">
            <Image
              alt="profile"
              src={review.profileImagePth ? review.profileImagePth : 'images/profile.svg'}
              width={24}
              height={24}
              style={{ objectFit: 'cover' }}
              className="rounded-full"
            />
          </div>
          <span className="text-blue-700">{review.name}</span>
          <span>|</span>
          <span className="text-blue-500">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
