import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import MoreButton from '@/components/review/ReviewCard/MoreButton';
import Rating from '@/components/shared/Rating';
import type { List } from '@/types/mypage';

export function ReviewableCard({ MeetingData }: { MeetingData: List }) {
  const commentRef = useRef<HTMLParagraphElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);

  const toggleExpand = () => setIsExpanded((prev) => !prev);
  const comment = '리뷰 content';

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
  }, []);

  return (
    <div className="grid grid-cols-1 px-1 phablet:grid-cols-2 tablet:grid-cols-1 pc:grid-cols-1">
      {MeetingData.content.map((list, i) => {
        const dateObj = new Date(list.createdAt);

        return (
          <div key={i}>
            <article className="m-3 flex justify-center rounded-3xl p-2 tablet:justify-start pc:justify-start">
              <div className="group flex flex-col justify-center gap-4 border-b-2 border-dashed border-gray-50 pb-5 phablet:items-start tablet:flex-row pc:flex-row">
                {list.gatheringImage ? (
                  <Image
                    alt="testImage"
                    src={list.gatheringImage}
                    width={280}
                    height={156}
                    style={{ width: '280px', height: '156px', objectFit: 'cover' }}
                    className="relative mx-auto flex-shrink-0 overflow-hidden rounded-lg"
                  />
                ) : (
                  <div className="relative mx-auto h-[156px] w-[280px] flex-shrink-0 overflow-hidden rounded-lg bg-gray-200" />
                )}
                <div className="flex flex-grow flex-col items-start justify-start gap-2 tablet:h-[156px] tablet:pt-0">
                  <Rating score={list.score} />
                  <div className="flex w-full flex-col items-start">
                    <p ref={commentRef} className={`text-pretty break-all text-base ${isExpanded ? '' : 'line-clamp-1'}`}>
                      {comment}
                      {!isExpanded && showMoreButton && '...'}
                    </p>
                    {showMoreButton && <MoreButton isExpanded={isExpanded} onClick={toggleExpand} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="truncate text-xs">{list.groupName}</span>
                      <span className="text-xs">·</span>
                      <span className="text-xs font-medium text-blue-700">{list.location}</span>
                    </div>
                    <span className="select-none text-md text-blue-400">
                      {`${dateObj.getFullYear()}.${(dateObj.getMonth() + 1).toString().padStart(2, '0')}.${dateObj.getDate().toString().padStart(2, '0')}`}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        );
      })}
    </div>
  );
}
