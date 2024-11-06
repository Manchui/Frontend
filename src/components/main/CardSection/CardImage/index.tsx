import { Bagel_Fat_One } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import type { GetGatheringResponse } from '@manchui-api';

interface CardImageProps {
  gathering: GetGatheringResponse['data']['gatheringList'][number];
}

const bagelFatOne = Bagel_Fat_One({ weight: '400', subsets: ['latin'] });

export default function CardImage({ gathering }: CardImageProps) {
  return (
    <Link
      href={`/detail/${gathering.gatheringId}`}
      className="relative h-1/2 min-h-36 w-full cursor-pointer overflow-hidden mobile:h-full mobile:w-1/3 tablet:h-1/2 tablet:w-full"
    >
      <Image
        src={gathering.gatheringImage}
        alt="카드 이미지"
        fill
        priority
        sizes="(max-width: 820px) 50vw, (max-width: 1240px) 50vw, 50vw"
        className="transform rounded-t-2xl object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 mobile:rounded-l-2xl mobile:rounded-tr-none tablet:rounded-t-2xl tablet:rounded-bl-none"
      />
      {(gathering.currentUsers >= gathering.maxUsers || gathering.closed) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80">
          <span className={`text-full-response font-bold text-full ${bagelFatOne.className}`}>{gathering.closed ? 'CLOSED' : 'FULL'}</span>
        </div>
      )}
    </Link>
  );
}
