import { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import RenderCalendar from '@/components/shared/Calendar/RenderCalendar';

interface CalendarProps {
  selectionType: 'single' | 'range';
}

/**
 * 달력 컴포넌트 입니다.
 *
 * @param {selectionType} "single" | "range" - 단일 날짜(모임 생성) or 범위 선택 모드(모임 찾기)
 */

export default function Calendar({ selectionType }: CalendarProps) {
  const [dropOpen, setDropOpen] = useState<boolean>(false);
  const [rangeEnd, setRangeEnd] = useState<string | null>(null);
  const [rangeStart, setRangeStart] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const years = Array.from({ length: 10 }, (_, i) => currentDate.getFullYear() - 4 + i);

  const handleDateSelection = (date: string) => {
    if (selectionType === 'single') {
      if (selectedDate === date) {
        setSelectedDate(null);
      } else {
        setSelectedDate(date);
      }
    } else if (selectionType === 'range') {
      if (!rangeStart) {
        setRangeStart(date);
      } else if (rangeStart && !rangeEnd && date >= rangeStart) {
        setRangeEnd(date);
      } else {
        setRangeStart(date);
        setRangeEnd(null);
      }
    }
  };

  const changeYear = (newYear: number) => {
    setCurrentDate(new Date(newYear, currentDate.getMonth(), 1));
    setDropOpen(false);
  };

  const changeMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(new Date(currentDate.getFullYear(), direction === 'prev' ? currentDate.getMonth() - 1 : currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="mx-auto size-[250px]">
      <div className="flex items-center justify-between">
        <div className="relative flex w-full items-center justify-between">
          <span onClick={() => setDropOpen(!dropOpen)} className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-gray-700">
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월{' '}
            <Image src="./icons/down-arrow.svg" alt="down arrow" width={18} height={18} className={`duration-300 ${dropOpen ? 'rotate-180' : 'rotate-0'}`} />
          </span>
          {dropOpen && (
            <ul
              className={`absolute top-full z-10 max-h-48 w-24 overflow-y-auto rounded-xl bg-white drop-shadow-2xl ${
                dropOpen ? 'animate-dropdown-open' : 'animate-dropdown-close'
              }`}
            >
              {years.map((year) => (
                <li key={year} onClick={() => changeYear(year)} className="cursor-pointer py-1 text-center text-sm hover:bg-gray-50">
                  {year}
                </li>
              ))}
            </ul>
          )}
          <div className="flex cursor-pointer gap-3">
            <button type="button" onClick={() => changeMonth('prev')}>
              <div className="hover:animate-pingpong absolute size-4 rounded-full hover:bg-gray-50 hover:opacity-0" />
              <Image src="./icons/left.svg" alt="Previous Btn" width={16} height={16} />
            </button>
            <button type="button" onClick={() => changeMonth('next')}>
              <div className="hover:animate-pingpong absolute size-4 rounded-full hover:bg-gray-50 hover:opacity-0" />
              <Image src="./icons/right.svg" alt="Next Btn" width={16} height={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-7">
        {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (
          <div
            key={day}
            className={clsx('text-center text-sm font-semibold', {
              'text-red-500': i === 0,
              'text-ocean': i === 6,
            })}
          >
            {day}
          </div>
        ))}
        <RenderCalendar
          rangeEnd={rangeEnd}
          rangeStart={rangeStart}
          currentDate={currentDate}
          selectedDate={selectedDate}
          selectionType={selectionType}
          onDateSelect={handleDateSelection}
        />
      </div>
    </div>
  );
}
