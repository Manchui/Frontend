import { useState } from 'react';
import FilterSection from '@/components/review/FilterSection';
import HeaderSection from '@/components/review/HeaderSection';
import { ReviewCard } from '@/components/review/ReviewCard';
import MainContainer from '@/components/review/ReviewContainer';
import RootLayout from '@/components/shared/RootLayout';

export default function Home() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="mt-[60px]">
      <RootLayout>
        <div className="flex h-[155px] w-full flex-col items-center justify-center gap-[10px] bg-blue-800 text-white">
          <p className="text-2xl font-bold">모든 리뷰</p>
          <span className="text-base font-medium">만취를 이용한 분들은 이렇게 느꼈어요</span>
        </div>
        <MainContainer>
          {/* Header (타이틀, 검색창) */}
          <HeaderSection searchValue={searchValue} setSearchValue={setSearchValue} selectedCategory={selectedCategory} />

          {/* 카테고리 */}
          <FilterSection selectedCategory={selectedCategory} handleCategoryClick={handleCategoryClick} />

          <section className="mt-0 flex w-full flex-col items-center gap-6 bg-white px-4 pb-6 pt-1 mobile:rounded-lg tablet:items-start">
            <ReviewCard
              review={{
                comment:
                  '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890',
                createdAt: '2024-01-25',
                name: '럽윈즈올',
                ImagePath: '/images/test-detail.png',
                profileImagePath: '/images/profile.svg',
                score: 5,
                userId: '25',
                gatheringName:'모르는 개 산책',
                gatheringLocation:'이태원',
              }}
            />

            <ReviewCard
              review={{
                comment: '너무 재밌어요!너무 재밌어요!너무 재밌어요!너무 재밌어요!너무 재밌어요!너무 재밌어요!너무 재밌어요!너무 재밌어요!',
                createdAt: '2024-01-25',
                name: '럽윈즈올',
                ImagePath: '/images/test-detail.png',
                profileImagePath: '/images/profile.svg',
                score: 5,
                userId: '25',
                gatheringName:'개발새발',
                gatheringLocation:'신림',
              }}
            />
          </section>
        </MainContainer>
      </RootLayout>
    </div>
  );
}
