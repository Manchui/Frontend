import { useState } from 'react';
import { Bagel_Fat_One } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import type { GetGatheringResponse } from '@manchui-api';

interface CardImageProps {
  gathering: GetGatheringResponse['data']['gatheringList'][number];
}

const bagelFatOne = Bagel_Fat_One({ weight: '400', subsets: ['latin'] });

export default function CardImage({ gathering }: CardImageProps) {
  const { gatheringId, gatheringImage, currentUsers, maxUsers, closed } = gathering;

  const [imageSrc, setImageSrc] = useState<string>(gatheringImage);

  const handleImageError = () => {
    setImageSrc('/images/no-img.png');
  };

  return (
    <Link
      href={`/detail/${gatheringId}`}
      className="relative h-1/2 min-h-36 w-full cursor-pointer overflow-hidden mobile:h-full mobile:w-1/3 tablet:h-1/2 tablet:w-full"
    >
      <Image
        src={imageSrc}
        alt="카드 이미지"
        fill
        priority
        onError={handleImageError}
        sizes="(max-width: 820px) 50vw, (max-width: 1240px) 50vw, 50vw"
        className="transform rounded-t-2xl object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 mobile:rounded-l-2xl mobile:rounded-tr-none tablet:rounded-t-2xl tablet:rounded-bl-none"
      />
      {(currentUsers >= maxUsers || closed) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <span className={`text-full-response font-bold text-full ${bagelFatOne.className}`}>{closed ? 'CLOSED' : 'FULL'}</span>
        </div>
      )}
    </Link>
  );
}
