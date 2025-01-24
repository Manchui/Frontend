import { useMemo } from 'react';
import CardSection, { CardSkeleton, MessageWithLink } from '@/components/main/MainCardSection/CardSection';
import NoData from '@/components/shared/NoData';
import PAGE_SIZE_BY_DEVICE from '@/constants/pageSize';
import useDeviceState from '@/hooks/useDeviceState';
import type { GetGatheringResponse } from '@manchui-api';

interface MainCardSectionProps {
  isError: boolean;
  isLoading: boolean;
  mainData: GetGatheringResponse['data']['gatheringList'][number][] | undefined;
  scrollRef?: React.RefObject<HTMLDivElement>;
}

export default function MainCardSection({ isLoading, isError, mainData, scrollRef }: MainCardSectionProps) {
  const deviceState = useDeviceState();
  const pageSize = useMemo(() => PAGE_SIZE_BY_DEVICE.MAIN[deviceState], [deviceState]);

  return (
    <div ref={scrollRef} className="mx-auto grid min-h-[200px] w-full select-none grid-cols-1 gap-6 px-2 mobile:p-0 tablet:grid-cols-3">
      {isLoading
        ? Array.from({ length: pageSize }).map((_, idx) => <CardSkeleton key={idx} />)
        : mainData?.map((gathering) => <CardSection key={gathering.gatheringId} gathering={gathering} />)}
      {mainData?.length === 0 && !isError && !isLoading && <NoData use="main" />}
      {isError && (
        <div className="absolute left-1/2 w-full -translate-x-1/2">
          <MessageWithLink message="에러가 발생하였습니다." buttonText="다시 시도하기" onClick={() => window.location.reload()} />
        </div>
      )}
    </div>
  );
}
