/* eslint-disable tailwindcss/no-custom-classname */
import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import MainCarousel from '@/components/main/MainCarousel';
import DateChip from '@/components/shared/chip/DateChip';
import { ProgressBar } from '@/components/shared/progress-bar';
import RootLayout from '@/components/shared/RootLayout';

const images = [
  { src: '/images/0.jpg' },
  { src: '/images/1.jpg' },
  { src: '/images/2.jpg' },
  { src: '/images/3.jpg' },
  { src: '/images/4.jpg' },
  { src: '/images/5.jpg' },
  { src: '/images/6.jpg' },
  { src: '/images/7.jpg' },
  { src: '/images/8.jpg' },
  { src: '/images/9.jpg' },
];

const filterOptions = [
  { id: 'all', label: '전체', icon: '/icons/main/all.svg' },
  { id: 'health', label: '운동', icon: '/icons/main/health.svg' },
  { id: 'movie', label: '영화', icon: '/icons/main/movie.svg' },
  { id: 'study', label: '공부', icon: '/icons/main/study.svg' },
  { id: 'cultureart', label: '문화/예술', icon: '/icons/main/curtureart.svg' },
  { id: 'game', label: '게임', icon: '/icons/main/game.svg' },
  { id: 'travel', label: '여행', icon: '/icons/main/travel.svg' },
  { id: 'food', label: '맛집', icon: '/icons/main/food.svg' },
  { id: 'music', label: '음악', icon: '/icons/main/music.svg' },
];
// const categoriesName = ['📋 전체', '🎨 문화 · 예술', '🍽️ 식음료', '⚽ 스포츠', '🗺️ 투어', '🏖️ 관광', '🌿 웰빙'];

const dates = new Date('2024-11-03 20:10');

const maxValue = 20;

export default function MainPage() {
  const [searchValue, setSearchValue] = useState(''); // 검색창
  const [mapDrop, setMapDrop] = useState<boolean>(false); // 지도 드롭다운
  const [selectedCategory, setSelectedCategory] = useState<string>('전체'); // 카테고리
  // const [closeFilter, setCloseFilter] = useState();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 검색값 변화 확인
    setSearchValue(e.target.value);
    // console.log('searchValue', searchValue);
  };

  const handleSearchSubmit = (e: FormEvent) => {
    // 검색값 제출
    e.preventDefault();
    if (searchValue !== '') {
      // console.log('제출성공');
      setSearchValue('');
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCloseFilter = () => {
    // console.log('마감임박');
  };

  return (
    <>
      <MainCarousel images={images} />
      <RootLayout>
        <div className="mx-auto flex w-full flex-col items-center justify-center pt-[40px] mobile:px-[30px] tablet:pt-0">
          {/* 타이틀, 검색창 -----------------------------------------------------------*/}
          <div className="flex w-full items-center justify-around text-title-response font-bold mobile:justify-between">
            <div className="flex gap-1">
              {filterOptions.map(
                (option) =>
                  selectedCategory === option.label && (
                    <Image key={option.id} src={option.icon} alt="타이틀 로고" width={40} height={40} className="mr-1 transition-opacity duration-300" />
                  ),
              )}
              <h2>{selectedCategory}</h2>
            </div>
            <form className="flex gap-1 border-b font-medium hover:border-b-blue-800" onSubmit={handleSearchSubmit}>
              <label htmlFor="input" className="cursor-pointer">
                <Image src="/icons/search.svg" alt="검색창" width={24} height={24} className="tablet:size-8" />
              </label>
              <input
                id="input"
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="만취에서 찾고 계신 모임이 있나요?"
                className="placeholder:text-13-18-response w-search-180-240 bg-background text-13-16-response text-gray-400 outline-none focus:text-blue-800"
              />
            </form>
          </div>
          {/* 카테고리 ----------------------------------------------------------- */}
          <div className="scrollbar-hide relative mb-8 mt-4 flex w-full flex-col gap-2 overflow-x-auto bg-white px-4 py-5 mobile:rounded-lg">
            <div className="scrollbar-hide w-full overflow-x-auto">
              <fieldset className="box-content flex min-w-max gap-2">
                <legend className="absolute size-1 overflow-hidden">filter</legend>
                {filterOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => {
                      handleCategoryClick(option.label);
                    }}
                  >
                    <input type="radio" id={option.id} className="hidden" />
                    <label
                      htmlFor={option.id}
                      className={`flex cursor-pointer rounded-lg border border-gray-100 px-4 py-2 text-13-16-response font-semibold text-gray-900 transition-all duration-200 hover:bg-blue-700 hover:text-white ${selectedCategory === option.label && 'bg-blue-800 text-white'}`}
                    >
                      {selectedCategory === option.label && (
                        <Image src={option.icon} alt={`${option.label} 아이콘`} width={20} height={20} className="mr-1 animate-slideInLeft invert" />
                      )}
                      {option.label}
                    </label>
                  </div>
                ))}
              </fieldset>
            </div>
            {/* 필터 ----------------------------------------------------------- */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  onClick={handleCloseFilter}
                  className="group flex items-center justify-center gap-1 rounded-lg border border-gray-100 p-2 text-13-16-response font-semibold text-gray-900 transition-all duration-200 hover:bg-blue-800 hover:text-white"
                >
                  <Image src="/icons/sort.svg" alt="마감 임박순" width={24} height={24} className="block group-hover:hidden mobile:size-[20px]" />
                  <Image
                    src="/icons/sort-white.svg"
                    alt="마감 임박순 (화이트)"
                    width={24}
                    height={24}
                    className="hidden group-hover:block mobile:size-[20px]"
                  />
                  <span className="hidden mobile:block">마감임박</span>
                </span>
                <span
                  onClick={() => setMapDrop(!mapDrop)}
                  className="inline-block rounded-lg border border-gray-100 px-4 py-2 text-13-16-response font-semibold text-gray-900 transition-all duration-200 hover:bg-blue-800 hover:text-white"
                >
                  지역
                </span>
                {mapDrop && (
                  <ul
                    className={`absolute top-full z-[9000] max-h-48 w-24 overflow-y-auto rounded-xl bg-white drop-shadow-2xl ${
                      mapDrop ? 'animate-dropdown-open' : 'animate-dropdown-close'
                    }`}
                  >
                    {Array.from({ length: 10 }, (_, array) => (
                      <li key={array}>{array}</li>
                    ))}
                  </ul>
                )}
                <span className="inline-block rounded-lg border border-gray-100 px-4 py-2 text-13-16-response font-semibold text-gray-900 transition-all duration-200 hover:bg-blue-800 hover:text-white">
                  날짜
                </span>
              </div>
              <span className="rounded-xl bg-blue-800 px-3 py-2 text-13-16-response font-semibold text-white transition-all duration-200 hover:bg-blue-700">
                모임 만들기
              </span>
            </div>
          </div>
          {/* 카드-------------------------------------------------------------------------------- */}
          <div className="mx-auto grid w-full grid-cols-1 grid-rows-3 gap-6 px-4 mobile:p-0 tablet:grid-cols-3">
            <div className="flex aspect-square flex-col overflow-hidden rounded-2xl bg-white mobile:aspect-auto mobile:h-[170px] mobile:flex-row tablet:aspect-square tablet:size-full tablet:min-h-[290px] tablet:flex-col">
              {/* 이미지 영역 */}
              <div className="relative h-1/2 w-full mobile:h-full mobile:w-1/3 tablet:h-1/2 tablet:w-full">
                <Image
                  src={images[5].src}
                  alt="카드 이미지"
                  fill
                  priority
                  sizes="(max-width: 820px) 50vw, (max-width: 1240px) 50vw, 50vw"
                  className="rounded-t-2xl object-cover mobile:rounded-l-2xl mobile:rounded-tr-none tablet:rounded-t-2xl tablet:rounded-bl-none"
                />
              </div>

              {/* 콘텐츠 영역 */}
              <div className="flex h-1/2 flex-1 flex-col justify-between p-2 mobile:h-full mobile:w-1/2 mobile:p-4 tablet:h-1/2 tablet:w-full">
                <div className="flex flex-col">
                  <div className="flex w-full justify-between">
                    <span className="text-pretty text-16-20-response font-semibold mobile:font-bold">달램핏 마인드풀니스</span>
                    <Image src="/icons/heart-active-noround.svg" alt="찜하기 취소" width={24} height={24} />
                  </div>
                  <span className="text-sub-response font-medium text-gray-400 mobile:font-semibold">을지로 3가</span>
                </div>
                <DateChip dateTime={dates} />
                <ProgressBar maxValue={maxValue} value={10} design="basics" />
              </div>
            </div>
          </div>
        </div>
      </RootLayout>
    </>
  );
}
