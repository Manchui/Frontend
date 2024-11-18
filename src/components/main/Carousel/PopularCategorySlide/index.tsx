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
    <div className="flex-col-center h-[400px] bg-black text-white mobile:h-[500px] tablet:h-[600px]">
      <h1 className="text-center text-24-40-response font-bold drop-shadow-lg">🔥 HOT 카테고리 🔥</h1>
      <div className="mt-20 flex justify-center gap-3 mobile:gap-6">
        {categories.map(({ rank, category, imageSrc }) => (
          <div
            key={rank}
            onClick={() => handleCategoryClick(category)}
            className="relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-md transition-transform duration-300 hover:scale-105"
          >
            <div className="absolute left-0 top-0 flex h-7 w-14 items-center justify-center rounded-br-md rounded-tl-md bg-primary-400 text-16-20-response font-medium text-blue-800">
              {rank}위
            </div>
            <Image src={imageSrc} alt={category} width={400} height={400} className="rounded-md" />
            <h2 className="text-16-26-response font-bold">{category} 카테고리</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
