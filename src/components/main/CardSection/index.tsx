import CardContent from '@/components/main/CardSection/CardContent';
import CardImage from '@/components/main/CardSection/CardImage';
import type { GatheringListData } from '@/types/main/types';

interface CardSectionProps {
  gathering: GatheringListData;
}

export default function CardSection({ gathering }: CardSectionProps) {
  return (
    <div className="group flex aspect-square flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_16px_0_rgba(17,34,17,0.05)] mobile:aspect-auto mobile:h-[170px] mobile:flex-row tablet:aspect-square tablet:size-full tablet:min-h-[290px] tablet:flex-col">
      {/* 이미지 영역 */}
      <CardImage gathering={gathering} />
      {/* 콘텐츠 영역 */}
      <CardContent gathering={gathering} />
    </div>
  );
}
