/* eslint-disable tailwindcss/no-custom-classname */
import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { Bagel_Fat_One } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import Dropdown from '@/components/main/Dropdown';
import MainCarousel from '@/components/main/MainCarousel';
import Calendar from '@/components/shared/Calendar';
import DateChip from '@/components/shared/chip/DateChip';
import { ProgressBar } from '@/components/shared/progress-bar';
import RootLayout from '@/components/shared/RootLayout';

const bagelFatOne = Bagel_Fat_One({ weight: '400', subsets: ['latin'] });

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

const regionData = ['건대 입구', '을지로 3가', '신림', '홍대 입구', '성수', '여의도', '강남', '영등포', '잠실', '이태원'];

const dates = new Date('2024-11-03 20:10');

const minUsers = 10;
const maxUsers = 20;

const closed = false;

export default function MainPage() {
  const [searchValue, setSearchValue] = useState(''); // 검색창
  const [selectedCategory, setSelectedCategory] = useState<string>('전체'); // 카테고리
  const [closeDate, setCloseDate] = useState<boolean>(false); // 마감임박 토글 상태
  const [selectedDates, setSelectedDates] = useState<{ rangeEnd?: string; rangeStart?: string; selectedDate?: string }>({});

  const [regionDropOpen, setRegionDropOpen] = useState(false); // 지도 드롭다운
  const [dateDropOpen, setDateDropOpen] = useState(false); // 캘린더 드롭다운
  const [hearted, setHearted] = useState(false); // 찜하기 상태

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
    // 카테고리 클릭
    setSelectedCategory(category);
  };

  const handleCloseFilterToggle = () => {
    // 마감 임박 토글 클릭
    const newCloseDateState = !closeDate;
    setCloseDate(newCloseDateState);

    // console.log(newCloseDateState ? 'closeDate' : '');
  };

  const handleRegionSelect = (region: string) => {
    // 지역 필터
    // eslint-disable-next-line no-console
    console.log('선택된 지역:', region);
    setRegionDropOpen(false);
  };

  const handleDateChange = (data: { rangeEnd?: string; rangeStart?: string; selectedDate?: string }) => {
    // 날짜 변경감지
    setSelectedDates(data);
  };

  const handleSubmit = () => {
    // 날짜 적용하기 제출 버튼
    const { rangeStart, rangeEnd } = selectedDates;
    if (!rangeStart || !rangeEnd) {
      // console.log('날짜가 선택되지 않았습니다. 범위를 선택해주세요.');
    } else {
      // console.log(`선택된 범위: 시작 날짜 ${rangeStart}, 종료 날짜 ${rangeEnd}`);
      // 여기에 API 요청 로직 추가 가능
    }
    setDateDropOpen(false);
  };

  const toggleHeart = () => {
    // 찜하기 토글 버튼
    setHearted((prevHearted) => {
      const newHearted = !prevHearted;
      // console.log('찜 상태:', newHearted);
      return newHearted;
    });
  };

  // const toggleHeart = async () => {
  //   try {
  //     const newHeartedValue = !hearted;
  //     setHearted(newHeartedValue);

  //     // API 요청
  //     await axios.post('/api/favorite', { hearted: newHeartedValue });
  //     console.log(`hearted: ${newHeartedValue}`);
  //   } catch (error) {
  //     console.error('API 요청에 실패했습니다:', error);
  //   }
  // };

  return (
    <>
      <MainCarousel images={images} />
      <RootLayout>
        <div className="mx-auto flex w-full flex-col items-center justify-center pt-[40px] mobile:px-[30px] tablet:pt-0">
          {/* 타이틀, 검색창 -----------------------------------------------------------*/}
          <div className="flex w-full items-center justify-around text-title-response font-bold mobile:justify-between">
            <div className="flex items-center gap-1">
              {filterOptions.map(
                (option) =>
                  selectedCategory === option.label && (
                    <Image
                      key={option.id}
                      src={option.icon}
                      alt="타이틀 로고"
                      width={30}
                      height={30}
                      className="h-title-image w-title-image transition-opacity duration-300"
                    />
                  ),
              )}
              <h2>{selectedCategory}</h2>
            </div>
            <form className="flex gap-1 border-b font-medium hover:border-b-blue-800" onSubmit={handleSearchSubmit}>
              <label htmlFor="input" className="cursor-pointer">
                <Image src="/icons/main/search.svg" alt="검색창" width={24} height={24} className="tablet:size-8" />
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
          <div className="scrollbar-hide relative mb-8 mt-4 flex w-full select-none flex-col gap-2 bg-white px-4 py-5 mobile:rounded-lg">
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
                      className={`flex cursor-pointer rounded-lg border border-gray-100 px-4 py-2 text-13-16-response font-semibold text-gray-900 transition-all duration-300 hover:bg-blue-700 hover:text-white ${selectedCategory === option.label && 'bg-blue-800 text-white'}`}
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
            {/* 필터 */}
            <div className="flex select-none items-center justify-between">
              <div className="flex items-center gap-2">
                {/* 마감임박 필터 */}
                <span
                  onClick={handleCloseFilterToggle}
                  className={`group flex cursor-pointer items-center justify-center gap-1 rounded-lg border border-gray-100 p-2 text-13-16-response font-semibold text-gray-900 transition-all duration-200 ${closeDate && 'bg-blue-800 text-white'}`}
                >
                  <Image
                    src={closeDate ? '/icons/sort-white.svg' : '/icons/sort.svg'}
                    alt="마감 임박순"
                    width={20}
                    height={20}
                    className="mobile:size-[20px]"
                  />
                  <span className="hidden mobile:block">마감임박</span>
                </span>
                {/* 지역 필터 */}
                <Dropdown dropOpen={regionDropOpen} isOpen={regionDropOpen} setIsOpen={setRegionDropOpen} buttonLabel="지역" className="left-0">
                  <ul className={`max-h-48 w-24 overflow-y-auto rounded-xl ${regionDropOpen ? 'animate-dropdown-open' : 'animate-dropdown-close'}`}>
                    {regionData.map((region) => (
                      <li
                        key={region}
                        onClick={() => handleRegionSelect(region)}
                        className="text-13-15-response cursor-pointer p-2 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {region}
                      </li>
                    ))}
                  </ul>
                </Dropdown>
                {/* 모임 날짜 필터 */}
                <Dropdown
                  dropOpen={dateDropOpen}
                  isOpen={dateDropOpen}
                  setIsOpen={setDateDropOpen}
                  buttonLabel={
                    <>
                      <span className="hidden mobile:block">모임</span>
                      <span>날짜</span>
                    </>
                  }
                  className="left-date-calendar"
                >
                  <div className={`p-6 ${dateDropOpen ? 'animate-dropdown-open' : 'animate-dropdown-close'}`}>
                    <Calendar selectionType="range" onDateChange={handleDateChange} />
                    <div className="text-13-15-response flex h-[40px] justify-center gap-2 font-semibold">
                      <button type="button" onClick={() => {}} className="w-[120px] rounded-xl border border-blue-800">
                        초기화 하기
                      </button>
                      <button type="button" onClick={handleSubmit} className="w-[120px] rounded-xl bg-blue-800 text-white">
                        적용하기
                      </button>
                    </div>
                  </div>
                </Dropdown>
              </div>
              {/* 모임 생성 버튼 */}
              <Link
                href="/create"
                className="rounded-xl bg-blue-800 px-3 py-2 text-13-16-response font-semibold text-white transition-all duration-200 hover:bg-blue-700"
              >
                모임 만들기
              </Link>
            </div>
          </div>
          {/* 카드-------------------------------------------------------------------------------- */}
          <div className="mx-auto grid w-full select-none grid-cols-1 grid-rows-3 gap-6 px-4 mobile:p-0 tablet:grid-cols-3">
            <div className="group flex aspect-square flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_16px_0_rgba(17,34,17,0.05)] mobile:aspect-auto mobile:h-[170px] mobile:flex-row tablet:aspect-square tablet:size-full tablet:min-h-[290px] tablet:flex-col">
              {/* 이미지 영역 */}
              <Link href="/main/1" className="relative h-1/2 w-full cursor-pointer overflow-hidden mobile:h-full mobile:w-1/3 tablet:h-1/2 tablet:w-full">
                <Image
                  src={images[5].src}
                  alt="카드 이미지"
                  fill
                  priority
                  sizes="(max-width: 820px) 50vw, (max-width: 1240px) 50vw, 50vw"
                  className="transform rounded-t-2xl object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 mobile:rounded-l-2xl mobile:rounded-tr-none tablet:rounded-t-2xl tablet:rounded-bl-none"
                />
                {(minUsers >= maxUsers || closed) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <span className={`text-full text-full-response font-bold ${bagelFatOne.className}`}>{closed ? 'CLOSED' : 'FULL'}</span>
                  </div>
                )}
              </Link>

              {/* 콘텐츠 영역 */}
              <div className="relative flex h-1/2 flex-1 flex-col justify-between p-2 mobile:h-full mobile:w-1/2 mobile:p-4 tablet:h-1/2 tablet:w-full">
                <Link href="/main/1" className="my-auto flex flex-col gap-1">
                  <div className={`mb-2 flex flex-col tablet:mb-0 ${closed ? 'text-gray-200' : 'text-black'}`}>
                    <span className="text-pretty text-16-20-response font-semibold mobile:font-bold">달램핏 마인드풀니스</span>
                    <span className={`text-sub-response font-medium text-gray-400 mobile:font-semibold ${closed && '!text-gray-200'}`}>을지로 3가</span>
                  </div>
                  <DateChip dateTime={dates} closed={closed} />
                  <ProgressBar maxValue={maxUsers} value={minUsers} design="basics" closed={closed} />
                </Link>
                <button type="button" onClick={toggleHeart} className="right-heart-m-right top-heart-m-top tablet:top-heart-t-top absolute">
                  <Image src={hearted ? '/icons/heart-active-noround.svg' : '/icons/heart-inactive-noround.svg'} alt="찜하기 버튼" width={28} height={28} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </RootLayout>
    </>
  );
}
