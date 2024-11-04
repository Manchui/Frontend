import { useState } from 'react';
import HeaderSection from '@/components/main/HeaderSection';
import MainContainer from '@/components/main/MainContainer';
import FilterSection from '@/components/review/FilterSection';
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
        <MainContainer>
          {/* Header (타이틀, 검색창) */}
          <HeaderSection searchValue={searchValue} setSearchValue={setSearchValue} selectedCategory={selectedCategory} />

          {/* 카테고리 */}
          <FilterSection selectedCategory={selectedCategory} handleCategoryClick={handleCategoryClick} />
        </MainContainer>
      </RootLayout>
    </div>
  );
}
