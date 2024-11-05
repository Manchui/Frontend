import { useEffect, useRef,useState } from 'react';
import Image from 'next/image';
import Rating from '@/components/shared/Rating';

import MoreButton from './MoreButton';

type ReviewList = {
  ImagePath: string;
  comment: string;
  createdAt: string;
  gatheringLocation: string;
  gatheringName: string;
  name: string;
  profileImagePath: string;
  score: number;
  userId: string;
};

export function ReviewCard({ review }: { review: ReviewList }) {
  const dateObj = new Date(review.createdAt);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const commentRef = useRef<HTMLParagraphElement | null>(null);

  const toggleExpand = () => setIsExpanded((prev) => !prev);
  
  const formattedDate = `${dateObj.getFullYear()}.${(dateObj.getMonth() + 1)
    .toString()
    .padStart(2, '0')}.${dateObj.getDate().toString().padStart(2, '0')}`;

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

      window.addEventListener('resize', checkClamped);

      return () => window.removeEventListener('resize', checkClamped);
    }
    return undefined;
  }, [review.comment]);

  return (
    <div className="tablet:flex w-[280px] flex-col items-start gap-4 tablet:w-full tablet:flex-row">
        <Image alt="testImage" src={review.ImagePath} width={280} height={156} style={{ objectFit: 'cover' }} className="rounded-lg relative mx-auto flex-shrink-0 overflow-hidden" />
      <div className="flex flex-grow flex-col items-start justify-start gap-2 border-b-2 border-gray-50 border-dashed tablet:min-h-[156px] pt-4 tablet:pt-0">
        <Rating score={review.score} />
        <div className="flex flex-col items-start w-full">
          <p
            ref={commentRef}
            className={`text-pretty break-all text-sm font-medium ${isExpanded ? '' : 'line-clamp-1'}`}
          >
            {review.comment}
            {!isExpanded && showMoreButton && '...'}
          </p>
          {showMoreButton && (
            <MoreButton isExpanded={isExpanded} onClick={toggleExpand} />
          )}
        </div>
        <div className="flex w-full items-center gap-1 text-xs font-medium text-blue-700">
          <span>{review.gatheringName}</span>
          <span> &bull;</span>
          <span>{review.gatheringLocation}</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium mb-3">
          <div className="relative size-6 rounded-full">
            <Image alt="profile" src={review.profileImagePath} fill style={{ objectFit: 'cover' }} className="rounded-full" />
          </div>
          <span className="text-blue-700">{review.name}</span>
          <span>|</span>
          <span className="text-blue-500">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
