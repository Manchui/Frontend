import { useCallback } from 'react';
import Image from 'next/image';
import { useSetCategory } from '@/store/useFilterStore';

interface PopularCategorySlideProps {
  base64: {
    develop: string;
    food: string;
    study: string;
  };
}

const categories = [
  { rank: 1, category: '개발', img: 'develop', imageSrc: '/images/main/develop.webp' },
  { rank: 2, category: '공부', img: 'study', imageSrc: '/images/main/study.webp' },
  { rank: 3, category: '맛집', img: 'food', imageSrc: '/images/main/food.webp' },
];

export default function PopularCategorySlide({ base64 }: PopularCategorySlideProps) {
  const setCategory = useSetCategory();

  const handleCategoryClick = useCallback(
    (category: string) => {
      setCategory(category);
    },
    [setCategory],
  );

  return (
    <div className="relative mx-auto flex h-[300px] max-w-[1000px] flex-col items-center justify-center text-center font-bold text-white">
      <h1 className="text-2xl text-lightred">🔥 인기 카테고리 🔥</h1>
      <h3 className="text-base font-semibold">실시간으로 모임수가 증가하고 있어요!</h3>
      <div className="mx-4 mt-5 flex justify-center gap-3 tablet:gap-6">
        {categories.map(({ rank, category, img, imageSrc }) => (
          <div
            key={rank}
            onClick={() => handleCategoryClick(category)}
            className="relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md duration-200 hover:scale-105"
          >
            <div className="absolute left-0 top-0 flex h-6 w-11 items-center justify-center rounded-br-md rounded-tl-md bg-lightred text-sm font-semibold text-blue-800">
              {rank}위
            </div>
            <Image
              src={imageSrc}
              alt={category}
              width={200}
              height={150}
              placeholder="blur"
              blurDataURL={base64[img as keyof typeof base64]}
              className="h-full rounded-md object-cover"
            />
            <h2 className="text-base">{category} 카테고리</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
