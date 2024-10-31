import CardContent from '@/components/main/CardSection/CardContent';
import CardImage from '@/components/main/CardSection/CardImage';
import type { Main } from '@/types/main/types';

interface CardSectionProps {
  mainData: Main;
}

export default function CardSection({ mainData }: CardSectionProps) {
  return (
    <div className="group flex aspect-square flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_16px_0_rgba(17,34,17,0.05)] mobile:aspect-auto mobile:h-[170px] mobile:flex-row tablet:aspect-square tablet:size-full tablet:min-h-[290px] tablet:flex-col">
      <CardImage mainData={mainData} />
      <CardContent />
    </div>
  );
}
