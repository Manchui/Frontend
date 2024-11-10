/* eslint-disable tailwindcss/no-custom-classname */
import Lottie from 'lottie-react';
import CardSection, { CardSkeleton, MessageWithLink } from '@/components/main/CardSection';
import type { GetGatheringResponse } from '@manchui-api';

import Empty from 'public/lottie/empty.json';

interface BookmarkCardListProps {
  data?: GetGatheringResponse['data'];
  handleCategoryClick: (value: string) => void;
  isError: boolean;
  isLoading: boolean;
  skeletonCount: number;
}

export default function BookmarkCardList({ data, isLoading, isError, skeletonCount, handleCategoryClick }: BookmarkCardListProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-whte relative grid w-full select-none grid-cols-1 gap-6 bg-white px-4 pb-4 tablet:grid-cols-3">
        {isLoading
          ? Array.from({ length: skeletonCount }).map((_, idx) => <CardSkeleton key={idx} />)
          : data?.gatheringList.map((gathering) => <CardSection key={gathering.gatheringId} gathering={gathering} />)}

        {data?.gatheringCount === 0 && (
          <div className="absolute left-1/2 w-full -translate-x-1/2">
            <Lottie animationData={Empty} className="h-empty fill-white" />
            <MessageWithLink onClick={() => handleCategoryClick('')} message="아직 찜한 모임이 없습니다." buttonText="모임 둘러보기" />
          </div>
        )}

        {isError && (
          <div className="absolute left-1/2 w-full -translate-x-1/2">
            <MessageWithLink message="에러가 발생하였습니다." buttonText="다시 시도하기" onClick={() => window.location.reload()} />
          </div>
        )}
      </div>
    </div>
  );
}
