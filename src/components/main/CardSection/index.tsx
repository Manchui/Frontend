/* eslint-disable tailwindcss/no-custom-classname */
import Image from 'next/image';
import Link from 'next/link';
import CardContent from '@/components/main/CardSection/CardContent';
import CardImage from '@/components/main/CardSection/CardImage';
import type { GetGatheringResponse } from '@manchui-api';

interface CardSectionProps {
  gathering: GetGatheringResponse['data']['gatheringList'][number];
}

export default function CardSection({ gathering }: CardSectionProps) {
  return (
    <div className="border-cardBorder group flex aspect-square min-h-[170px] flex-col overflow-hidden rounded-2xl border bg-white shadow-[0_4px_16px_0_rgba(17,34,17,0.05)] mobile:aspect-auto mobile:h-[170px] mobile:flex-row tablet:aspect-square tablet:size-full tablet:min-h-[290px] tablet:flex-col">
      {/* 이미지 영역 */}
      <CardImage gathering={gathering} />
      {/* 콘텐츠 영역 */}
      <CardContent gathering={gathering} />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="relative aspect-square min-h-[170px] overflow-hidden rounded-2xl bg-slate-300 shadow-[0_4px_16px_0_rgba(17,34,17,0.05)] mobile:aspect-auto mobile:h-[170px] mobile:flex-row tablet:aspect-square tablet:size-full tablet:min-h-[290px]">
      <div className="animate-skeleton absolute inset-0 bg-gradient-to-r from-transparent via-slate-100 to-transparent opacity-70" />
    </div>
  );
}

export function MessageWithLink({ message, buttonText, link, onClick }: { buttonText: string; link?: string; message: string; onClick?: () => void }) {
  return (
    <div className="absolute left-1/2 mt-10 flex -translate-x-1/2 flex-col items-center gap-4 text-pretty text-16-20-response font-bold">
      <span>{message}</span>
      {link ? (
        <Link href={link} className="flex w-fit items-center rounded-md bg-blue-800 px-4 py-2 text-sub-response text-white">
          {buttonText}
          <Image src="/icons/main/banner-btn.svg" alt={`${message} 버튼`} width={24} height={24} />
        </Link>
      ) : (
        <button type="button" onClick={onClick} className="flex w-fit items-center rounded-md bg-blue-800 px-4 py-2 text-sub-response text-white">
          {buttonText}
          <Image src="/icons/main/banner-btn.svg" alt={`${message} 버튼`} width={24} height={24} />
        </button>
      )}
    </div>
  );
}
