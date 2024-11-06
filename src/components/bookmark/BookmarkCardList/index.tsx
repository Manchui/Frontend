/* eslint-disable tailwindcss/no-custom-classname */
import CardSection from '@/components/main/CardSection';
import type { GetGatheringResponse } from '@manchui-api';

interface BookmarkCardListProps {
  data: GetGatheringResponse['data'];
}

export default function BookmarkCardList({ data }: BookmarkCardListProps) {
  return (
    <div className="bg-whte grid w-full select-none grid-cols-1 grid-rows-2 gap-6 bg-white px-4 tablet:grid-cols-3 tablet:grid-rows-3">
      {data.gatheringList.map((gathering) => (
        <CardSection key={gathering.gatheringId} gathering={gathering} />
      ))}
    </div>
  );
}
