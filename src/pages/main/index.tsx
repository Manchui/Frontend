/* eslint-disable tailwindcss/no-custom-classname */
import { useState } from 'react';
import type { GetServerSideProps } from 'next';
import instance from '@/apis/api';
import CardSection from '@/components/main/CardSection';
import FilterSection from '@/components/main/FilterSection';
import HeaderSection from '@/components/main/HeaderSection';
import MainCarousel from '@/components/main/MainCarousel';
import MainContainer from '@/components/main/MainContainer';
import RootLayout from '@/components/shared/RootLayout';
import type { Main } from '@/types/main/types';

type MainPageProps = {
  mainData: Main;
};

export default function MainPage({ mainData }: MainPageProps) {
  const [searchValue, setSearchValue] = useState(''); // 검색창 -------------- 나중에 카드섹션에 연결해야함
  const [selectedCategory, setSelectedCategory] = useState<string>('전체'); // 카테고리

  // 캐러셀 이미지 데이터 변수
  const images = mainData?.data.gatheringList.map((gathering) => gathering.gatheringImage) || [];

  const handleCategoryClick = (category: string) => {
    // 카테고리 클릭
    setSelectedCategory(category);
  };

  return (
    <>
      <MainCarousel images={images} />
      <RootLayout>
        <MainContainer>
          {/* Header (타이틀, 검색창) */}
          <HeaderSection searchValue={searchValue} setSearchValue={setSearchValue} selectedCategory={selectedCategory} />

          {/* 카테고리 */}
          <FilterSection selectedCategory={selectedCategory} handleCategoryClick={handleCategoryClick} />
          {/* 카드-------------------------------------------------------------------------------- */}
          <div className="mx-auto grid w-full select-none grid-cols-1 grid-rows-3 gap-6 px-4 mobile:p-0 tablet:grid-cols-3">
            <CardSection mainData={mainData} />
          </div>
        </MainContainer>
      </RootLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await instance.get<Main>('http://localhost:8888/main');
    return {
      props: {
        mainData: res.data,
      },
    };
  } finally {
    // console 에러때문에 넣은거입니다;
  }
  // catch () {
  //   // console.error('Failed to fetch data:', e);
  //   return {
  //     props: {
  //       mainData: null, // 데이터를 가져오지 못했을 때 처리
  //     },
  //   };
  // }
};
