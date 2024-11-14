/* eslint-disable tailwindcss/no-custom-classname */
import CardSection, { CardSkeleton, MessageWithLink } from '@/components/main/CardSection';
import NoData from '@/components/shared/NoData';
import type { GetGatheringResponse } from '@manchui-api';

interface BookmarkCardListProps {
  data?: GetGatheringResponse['data'];
  isError: boolean;
  isLoading: boolean;
  skeletonCount: number;
}

export default function BookmarkCardList({ data, isLoading, isError, skeletonCount }: BookmarkCardListProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-whte relative grid w-full select-none grid-cols-1 gap-6 bg-white px-4 pb-4 tablet:grid-cols-3">
        {isLoading
          ? Array.from({ length: skeletonCount }).map((_, idx) => <CardSkeleton key={idx} />)
          : data?.gatheringList.map((gathering) => <CardSection key={gathering.gatheringId} gathering={gathering} />)}

        {data?.gatheringCount === 0 && !isError && <NoData use="bookmark" />}

        {isError && (
          <div className="absolute left-1/2 w-full -translate-x-1/2">
            <MessageWithLink message="에러가 발생하였습니다." buttonText="다시 시도하기" onClick={() => window.location.reload()} />
          </div>
        )}
      </div>
    </div>
  );
}
