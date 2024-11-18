/* eslint-disable tailwindcss/no-custom-classname */
import { memo } from 'react';
import { Gugi } from 'next/font/google';
import Link from 'next/link';
import ArrowBtn from 'public/icons/ArrowBtn';
import CardContent from '@/components/main/CardSection/CardContent';
import CardImage from '@/components/main/CardSection/CardImage';
import type { GetGatheringResponse } from '@manchui-api';

interface CardSectionProps {
  gathering: GetGatheringResponse['data']['gatheringList'][number];
}

const gugi = Gugi({ weight: '400', subsets: ['latin'] });

function CardSection({ gathering }: CardSectionProps) {
  return (
    <Link
      href={`/detail/${gathering.gatheringId}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_16px_0_rgba(17,34,17,0.05)] mobile:flex-row tablet:flex-col"
    >
      <CardImage gathering={gathering} />
      <CardContent gathering={gathering} />
    </Link>
  );
}

export default memo(CardSection);

export function CardSkeleton() {
  return (
    <div className="relative aspect-square min-h-[170px] overflow-hidden rounded-2xl bg-slate-300 shadow-[0_4px_16px_0_rgba(17,34,17,0.05)] mobile:aspect-auto mobile:h-[170px] mobile:flex-row tablet:aspect-square tablet:size-full tablet:min-h-[290px]">
      <div className="absolute inset-0 animate-skeleton bg-gradient-to-r from-transparent via-slate-100 to-transparent opacity-70" />
    </div>
  );
}

export function MessageWithLink({ message, buttonText, link, onClick }: { buttonText: string; link?: string; message?: string; onClick?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 text-pretty text-bookmark-title font-bold">
      <span className={`${gugi.className}`}>{message}</span>
      {link ? (
        <Link href={link} className="flex items-center rounded-md bg-black px-4 py-2 text-sub-response text-white">
          {buttonText}
          <ArrowBtn direction="right" className="size-4 stroke-white mobile:size-7" />
        </Link>
      ) : (
        <button type="button" onClick={onClick} className="flex items-center rounded-md bg-black px-4 py-2 text-10-24-response text-white">
          {buttonText}
          <ArrowBtn direction="right" className="size-4 stroke-white mobile:size-7" />
        </button>
      )}
    </div>
  );
}
