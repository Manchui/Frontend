import { useRef } from 'react';
import { useInView } from 'framer-motion';
import * as m from 'framer-motion/m';
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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={scrollRef} className="w-full">
      <m.div
        ref={ref}
        style={{
          transform: isInView ? 'none' : 'translateY(10px)',
          opacity: isInView ? 1 : 0,
          transition: 'all 1s ease-in-out',
        }}
        className="mx-auto grid min-h-[200px] w-full select-none grid-cols-1 gap-6 px-2 mobile:p-0 tablet:grid-cols-3"
      >
        {isLoading && !isError
          ? Array.from({ length: pageSize }).map((_, idx) => <CardSkeleton key={idx} />)
          : mainData.map((gathering) => <CardSection key={gathering.gatheringId} gathering={gathering} />)}
        {mainData.length === 0 && !isError && <NoData use="main" />}
        {isError && (
          <div className="absolute left-1/2 w-full -translate-x-1/2">
            <MessageWithLink message="에러가 발생하였습니다." buttonText="다시 시도하기" onClick={() => window.location.reload()} />
          </div>
        )}
      </m.div>
    </div>
  );
}
