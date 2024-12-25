/* eslint-disable tailwindcss/no-custom-classname */
import { useCallback } from 'react';
import Image from 'next/image';
import { useSetCategory } from '@/store/useFilterStore';

interface PopularCategorySlideProps {
  handleScrollToFilter: () => void;
}

const categories = [
  { rank: 1, category: '개발', imageSrc: '/images/develop.webp' },
  { rank: 2, category: '공부', imageSrc: '/images/study.webp' },
  { rank: 3, category: '맛집', imageSrc: '/images/food.webp' },
];

export default function PopularCategorySlide({ handleScrollToFilter }: PopularCategorySlideProps) {
  const setCategory = useSetCategory();

  const handleCategoryClick = useCallback(
    (category: string) => {
      setCategory(category);
      handleScrollToFilter();
    },
    [handleScrollToFilter, setCategory],
  );

  return (
    <div className="relative h-[400px] bg-[#000000] text-white mobile:h-[500px] tablet:h-[600px]">
      <div className="absolute right-1/4 top-1/2 z-0 size-[400px] -translate-y-1/2">
        <Image src="/images/popular.webp" alt="인기 카테고리" fill className="object-cover" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1200px] items-center">
        <div className="flex flex-1 flex-col items-center justify-center">
          <h1 className="text-center text-24-40-response font-bold text-lightred drop-shadow-lg">🔥 인기 카테고리 🔥</h1>
          <h3 className="mt-2 text-center text-16-20-response font-semibold">실시간으로 모임수가 증가하고 있어요!</h3>
          <div className="mt-10 flex justify-center gap-3 mobile:gap-6">
            {categories.map(({ rank, category, imageSrc }) => (
              <div
                key={rank}
                onClick={() => handleCategoryClick(category)}
                className="relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-md transition-transform duration-300 hover:scale-105"
              >
                <div className="absolute left-0 top-0 flex h-7 w-14 items-center justify-center rounded-br-md rounded-tl-md bg-lightred text-16-20-response font-semibold text-blue-800">
                  {rank}위
                </div>
                <Image src={imageSrc} alt={category} width={400} height={400} className="h-full rounded-md object-cover" />
                <h2 className="text-16-26-response font-bold">{category} 카테고리</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
