import { useState } from 'react';
import Image from 'next/image';
import Calendar from '@/components/shared/Calendar';

export default function CreatePage() {
  const [selectedDates, setSelectedDates] = useState<{ rangeEnd?: string | null; rangeStart?: string | null }>({});

  const handleDateApply = () => {
    if (selectedDates.rangeStart && selectedDates.rangeEnd) {
      if (selectedDates.rangeStart && selectedDates.rangeEnd) {
        // eslint-disable-next-line no-console
        console.log('선택된 범위:', selectedDates.rangeStart, '부터', selectedDates.rangeEnd, '까지');
      } else {
        // eslint-disable-next-line no-console
        console.log('날짜가 선택되지 않았습니다.');
      }
    }
  };
  const handleDateReset = () => {
    setSelectedDates({ rangeStart: null, rangeEnd: null });
  };
  return (
    <>
      <header className="mb-5 mt-[60px] flex h-[97px] w-full items-center justify-center bg-blue-800 mobile:mb-10 mobile:h-[118px] tablet:h-[161px]">
        <h1 className="text-lg font-semibold text-white mobile:font-bold tablet:text-2xl">만취 모임 만들기</h1>
      </header>
      <div className=" px-3 mx-auto flex max-w-[343px] flex-col items-center justify-center mobile:max-w-[744px] tablet:max-w-[1000px]">
        <main className="w-full space-y-6 mobile:space-y-10">
          <div>
            <h2 className="text-base font-semibold text-gray-900"> 모임 이름 </h2>
            <input placeholder=" 모임 이름을 작성해주세요" className="mt-3 h-11 w-full rounded-xl border border-blue-100 bg-blue-50 pl-2 text-sm font-medium" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900"> 선택 서비스 </h2>
            <input
              placeholder=" 서비스 카테고리를 정해주세요."
              className="mt-3 h-11 w-full rounded-xl border border-blue-100 bg-blue-50 pl-2 text-sm font-medium"
            />
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900"> 모임 설명 </h2>
            <textarea
              placeholder=" 모임에 대한 설명을 작성해주세요."
              className="mt-3 min-h-40 w-full rounded-xl border border-blue-100 bg-blue-50 pl-2 pt-3 text-sm font-medium"
            />
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900"> 장소 </h2>
            <input placeholder=" 모임 위치를 정해주세요." className="mt-3 h-11 w-full rounded-xl border border-blue-100 bg-blue-50 pl-2 text-sm font-medium" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900"> 모집 정원 </h2>
            <div className="flex w-full gap-3">
              <input
                placeholder=" 최소 정원을 정해주세요."
                className="mt-3 h-11 w-full rounded-xl border border-blue-100 bg-blue-50 pl-2 text-sm font-medium"
              />
              <input
                placeholder=" 최대 정원을 정해주세요."
                className="mt-3 h-11 w-full rounded-xl border border-blue-100 bg-blue-50 pl-2 text-sm font-medium"
              />
            </div>
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900"> 날짜 </h2>
            <div className="mt-3 flex h-[322px] w-full flex-col items-center justify-center rounded-lg border border-blue-200 shadow">
              <Calendar selectionType="range" onDateChange={handleDateApply} />
              <div className="-mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={handleDateReset}
                  className="h-10 w-[120px] rounded-xl border-2 border-blue-800 bg-white text-blue-800 hover:border-blue-400 hover:text-blue-400"
                >
                  초기화하기
                </button>
                <button type="button" onClick={handleDateApply} className="h-10 w-[120px] rounded-xl bg-blue-800 text-white hover:bg-blue-700">
                  적용하기
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <h2 className="text-base font-semibold text-gray-900">오전</h2>
            </div>

            <div className="scrollbar-hidden flex space-x-1.5 overflow-x-auto">
              {Array.from({ length: 3 }).map((_, index) => {
                const time = 9 + index;
                return (
                  <button
                    type="button"
                    key={index}
                    className="relative mt-3 h-8 w-[60px] shrink-0 rounded-lg border border-blue-100 text-sm font-medium bg-blue-50 text-gray-900"
                  >
                    {time}:00
                  </button>
                );
              })}
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <h2 className="text-base font-semibold text-gray-900">오후</h2>
            </div>

            <div className="scrollbar-hidden flex space-x-1.5 overflow-x-auto">
              {Array.from({ length: 7 }).map((_, index) => {
                const time = 12 + index;
                return (
                  <button
                    type="button"
                    key={index}
                    className="relative mt-3 h-8 w-[60px] shrink-0 rounded-lg border border-blue-100 text-sm font-medium bg-blue-50 text-gray-900"
                  >
                    {time}:00
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <h2 className="text-base font-semibold text-gray-900">이미지</h2>
              <span className="text-sm text-gray-400">(1/1)</span>
            </div>

            <div className="scrollbar-hidden flex space-x-3 overflow-x-auto">
              <button
                type="button"
                className="mt-3 flex size-[100px] shrink-0 flex-col items-center justify-center rounded-lg border border-blue-200 text-sm font-medium text-blue-800 mobile:size-[150px]"
              >
                <Image src="/icons/+.svg" alt="+" width={18} height={18} className="mb-2" />
                이미지 등록
              </button>

              {Array.from({ length: 1 }).map((_, index) => (
                <div key={index} className="relative mt-3 size-[100px] shrink-0 rounded-lg border border-blue-200 mobile:size-[150px]">
                  <Image src="/images/write-reviewpage.png" alt="예시 이미지" className="rounded-lg object-cover" fill />
                  <button type="button" className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-black opacity-60">
                    <Image src="/icons/x-white.svg" alt="닫기" width={12} height={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
        <footer className="my-8 flex w-full gap-2">
          <button
            type="button"
            onClick={handleDateReset}
            className="h-10 w-full rounded-xl border border-blue-800 bg-white text-blue-800 hover:border-blue-400 hover:text-blue-400"
          >
            취소
          </button>
          <button type="button" onClick={handleDateApply} className="h-10 w-full rounded-xl bg-blue-800 text-white hover:bg-blue-700">
            등록하기
          </button>
        </footer>
      </div>
    </>
  );
}
