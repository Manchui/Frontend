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
  { id: 'all', label: '전체' },
  { id: 'health', label: '운동' },
  { id: 'movie', label: '영화' },
  { id: 'study', label: '공부' },
  { id: 'artculture', label: '예술/문화' },
  { id: 'game', label: '게임' },
  { id: 'travel', label: '여행' },
  { id: 'food', label: '맛집' },
  { id: 'music', label: '음악' },
];

const dates = new Date('2024-11-03 20:10');

const maxValue = 20;

export default function MainPage() {
  const [mapDrop, setMapDrop] = useState<boolean>(false);
  /**
   * 1. 카테고리 누를때 이미지 => 런닝?
   * 2. 태블릿 사이즈 -> 세로 길게?
   * 3. 모바일 사이즈 => 검색창 이랑 모임 만들기 버튼위치
   * 4. aspect-square 사이즈
   * 5.
   */

  return (
    <>
      <MainCarousel images={images} />
      <RootLayout>
        <div className="mx-auto flex w-full flex-col items-center justify-center pt-[40px] mobile:px-[30px] tablet:pt-0">
          {/* 타이틀, 검색창 */}
          <div className="flex w-full items-center justify-around mobile:justify-between">
            <div className="float-left flex items-center gap-2 text-xl font-bold mobile:text-2xl tablet:text-4xl">
              <Image src="/icons/running.svg" alt="제목로고" width={24} height={24} className="mobile:size-[40px]" />
              <h2>운동</h2>
            </div>
            <div className="flex gap-1 border-b font-medium hover:border-b-blue-800">
              <label htmlFor="input" className="cursor-pointer">
                <Image src="/icons/search.svg" alt="검색창" width={24} height={24} className="tablet:size-8" />
              </label>
              <input
                id="input"
                type="text"
                placeholder="만취에서 찾고 계신 모임이 있나요?"
                className="bg-background text-gray-400 outline-none placeholder:text-xs focus:text-blue-800 mobile:w-[190px] mobile:placeholder:text-sm tablet:w-[300px]"
              />
            </div>
          </div>
          {/* 카테고리 */}
          <div className="scrollbar-hide relative mb-8 mt-4 flex w-full flex-col gap-2 overflow-x-auto bg-white px-4 py-5 mobile:rounded-lg">
            <div className="scrollbar-hide w-full overflow-x-auto">
              <fieldset className="box-content flex min-w-max gap-2">
                <legend className="absolute size-1 overflow-hidden">filter</legend>
                {filterOptions.map((option) => (
                  <span key={option.id}>
                    <input type="radio" id={option.id} className="hidden" />
                    <label
                      htmlFor={option.id}
                      className="inline-block rounded-lg border border-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 transition-all duration-200 hover:bg-blue-800 hover:text-white tablet:text-base"
                    >
                      {option.label}
                    </label>
                  </span>
                ))}
              </fieldset>
            </div>
            {/* 필터 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  onClick={() => setMapDrop(!mapDrop)}
                  className="inline-block rounded-lg border border-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 transition-all duration-200 hover:bg-blue-800 hover:text-white tablet:text-base"
                >
                  지역
                </span>
                {mapDrop && (
                  <ul
                    className={`absolute top-full z-10 max-h-48 w-24 overflow-y-auto rounded-xl bg-white drop-shadow-2xl ${
                      mapDrop ? 'animate-dropdown-open' : 'animate-dropdown-close'
                    }`}
                  >
                    {Array.from({ length: 10 }, (_, array) => (
                      <li key={array}>{array}</li>
                    ))}
                  </ul>
                )}
                <span className="inline-block rounded-lg border border-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 transition-all duration-200 hover:bg-blue-800 hover:text-white tablet:text-base">
                  날짜
                </span>
                <span className="group flex size-[38px] items-center justify-center rounded-lg border border-gray-100 text-sm font-semibold text-gray-900 transition-all duration-200 hover:bg-blue-800 mobile:size-[42px]">
                  <Image src="/icons/sort.svg" alt="마감 임박순" width={24} height={24} className="block group-hover:hidden" />
                  <Image src="/icons/sort-white.svg" alt="마감 임박순 (화이트)" width={24} height={24} className="hidden group-hover:block" />
                </span>
              </div>
              <span className="rounded-xl bg-blue-800 px-3 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-700 tablet:text-base">
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
                  src={images[6].src}
                  alt="카드 이미지"
                  priority
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-2xl mobile:rounded-l-2xl mobile:rounded-tr-none tablet:rounded-t-2xl tablet:rounded-bl-none"
                />
              </div>

              {/* 콘텐츠 영역 */}
              <div className="flex h-1/2 flex-1 flex-col justify-between p-3 mobile:h-full mobile:w-1/2 tablet:h-1/2 tablet:w-full">
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex flex-1 items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-pretty text-lg font-semibold mobile:text-xl mobile:font-bold">달램핏 마인드풀니스</span>
                      <span className="text-sm font-medium text-gray-500 mobile:font-semibold">을지로 3가</span>
                    </div>
                    <Image src="/icons/heart-active-noround.svg" alt="찜하기 취소" width={24} height={24} />
                  </div>
                  <DateChip dateTime={dates} />
                  <ProgressBar maxValue={maxValue} value={10} design="basics" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </RootLayout>
    </>
  );
}
