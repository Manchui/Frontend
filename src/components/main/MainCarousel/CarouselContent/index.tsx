import { Gugi } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import type { GetGatheringResponse } from '@manchui-api';

const gugi = Gugi({ weight: '400', subsets: ['latin'] });

export default function CarouselContent({ i, gathering }: { gathering: GetGatheringResponse['data']['gatheringList'][number]; i: number }) {
  const firstSlide = i === 0;
  const { gatheringImage, name, groupName, currentUsers, maxUsers, gatheringId } = gathering;

  return (
    <>
      <Image src={gatheringImage} alt={name} fill sizes="100vw" className="object-cover" loading={firstSlide ? 'eager' : 'lazy'} priority={firstSlide} />
      <div className="absolute inset-0 bg-bannerGradient" />
      <div className="absolute bottom-0 left-0 select-none p-6 text-white tablet:ml-6 tablet:p-6">
        <span className={`text-18-32-response font-bold ${gugi.className}`}>{name}</span>
        <div className="flex flex-col gap-1 font-bold">
          <div className="flex gap-1 text-title-response">
            <span className={`${gugi.className}`}>{groupName}</span>
            <span className={`${gugi.className}`}>|</span>
            <span className={`${gugi.className}`}>
              인원 {currentUsers}/{maxUsers}
            </span>
          </div>
          <Link href={`/detail/${gatheringId}`} className="flex w-fit items-center rounded-md bg-white/40 py-1 pl-2 text-sub-response mobile:py-2 mobile:pl-4">
            지금 인기 있는 모임을 만나보세요
            <Image src="/icons/main/banner-btn.svg" alt="자세히 보기" width={24} height={24} className="ml-2" />
          </Link>
        </div>
      </div>
    </>
  );
}
