import CardSection, { CardSkeleton, MessageWithLink } from '@/components/main/CardSection';
import NoData from '@/components/shared/NoData';
import type { GetGatheringResponse } from '@manchui-api';

interface MainCardSectionProps {
  isError: boolean;
  isLoading: boolean;
  mainData: GetGatheringResponse['data']['gatheringList'];
  pageSize: number;
  scrollRef?: React.RefObject<HTMLDivElement>;
}

export default function MainCardSection({ isLoading, isError, mainData, pageSize, scrollRef }: MainCardSectionProps) {
  return (
    <div ref={scrollRef} className="w-full">
      <div className="mx-auto grid min-h-[200px] w-full select-none grid-cols-1 gap-6 px-2 mobile:p-0 tablet:grid-cols-3">
        {isLoading && !isError
          ? Array.from({ length: pageSize }).map((_, idx) => <CardSkeleton key={idx} />)
          : mainData.map((gathering) => <CardSection key={gathering.gatheringId} gathering={gathering} />)}
        {mainData.length === 0 && !isError && !isLoading && <NoData use="main" />}
        {isError && (
          <div className="absolute left-1/2 w-full -translate-x-1/2">
            <MessageWithLink message="에러가 발생하였습니다." buttonText="다시 시도하기" onClick={() => window.location.reload()} />
          </div>
        )}
      </div>
    </div>
  );
}
