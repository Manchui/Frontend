/* eslint-disable tailwindcss/no-custom-classname */
import { useCallback, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import ArrowBtn from 'public/icons/ArrowBtn';
import DownArrow from 'public/icons/DownArrow';
import RenderCalendar from '@/components/shared/Calendar/RenderCalendar';

interface CalendarProps {
  isDateLocked?: boolean;
  onDateChange: (data: { rangeEnd?: string; rangeStart?: string; selectedDate?: string }) => void;
  prevRangeEnd?: string | null;
  prevRangeStart?: string | null;
  selectionType: 'single' | 'range';
}

/**
 * 달력 컴포넌트 입니다.
 *
 * @param {selectionType} "single" | "range" - 단일 날짜(모임 생성) or 범위 선택 모드(모임 찾기)
 * @param {onDateChange} (data: { selectedDate?: string; rangeStart?: string; rangeEnd?: string }) => void - 선택한 날짜를 전달하는 콜백 함수
 */

export default function Calendar({ selectionType, onDateChange, prevRangeStart, prevRangeEnd, isDateLocked }: CalendarProps) {
  const [dropOpen, setDropOpen] = useState<boolean>(false);
  const [rangeEnd, setRangeEnd] = useState<string | null>(null);
  const [rangeStart, setRangeStart] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const years = useMemo(() => Array.from({ length: 10 }, (_, i) => currentDate.getFullYear() - 4 + i), [currentDate]);

  const handleDateSelection = (date: string) => {
    if (isDateLocked) return;

    if (selectionType === 'single') {
      // 단일 날짜 선택 모드
      if (selectedDate === date) {
        setSelectedDate(null);
        onDateChange({ selectedDate: undefined });
      } else {
        setSelectedDate(date);
        onDateChange({ selectedDate: date });
      }
    } else if (selectionType === 'range') {
      if (!rangeStart) {
        setRangeStart(date);
        setRangeEnd(null);
        onDateChange({ rangeStart: date, rangeEnd: undefined });
      } else if (!rangeEnd && date > rangeStart) {
        setRangeEnd(date);
        onDateChange({ rangeStart, rangeEnd: date });
      } else {
        setRangeStart(date);
        setRangeEnd(null);
        onDateChange({ rangeStart: date, rangeEnd: undefined });
      }
    }
  };

  const changeYear = useCallback(
    (newYear: number) => {
      setCurrentDate(new Date(newYear, currentDate.getMonth(), 1));
      setDropOpen(false);
    },
    [currentDate],
  );

  const changeMonth = useCallback(
    (direction: 'prev' | 'next') => {
      setCurrentDate(new Date(currentDate.getFullYear(), direction === 'prev' ? currentDate.getMonth() - 1 : currentDate.getMonth() + 1, 1));
    },
    [currentDate],
  );

  useEffect(() => {
    if (prevRangeStart) setRangeStart(prevRangeStart);
    if (prevRangeEnd) setRangeEnd(prevRangeEnd);
  }, [prevRangeStart, prevRangeEnd]);

  return (
    <div className="mx-auto size-[250px]">
      <div className="flex items-center justify-between">
        <div className="relative flex w-full items-center justify-between">
          <span onClick={() => setDropOpen(!dropOpen)} className="flex cursor-pointer items-center gap-1 text-13-15-response font-semibold text-gray-700">
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월{' '}
            {/* <Image src="./icons/down-arrow.svg" alt="down arrow" width={18} height={18} className={`duration-300 ${dropOpen ? 'rotate-180' : 'rotate-0'}`} /> */}
            <DownArrow direction={dropOpen ? 'up' : 'down'} color="black" className="duration-300" />
          </span>
          {dropOpen && (
            <ul
              className={`absolute top-full z-50 max-h-48 w-24 overflow-y-auto rounded-xl bg-white drop-shadow-2xl ${
                dropOpen ? 'animate-dropdown-open' : 'animate-dropdown-close'
              }`}
            >
              {years.map((year) => (
                <li key={year} onClick={() => changeYear(year)} className="py-1 text-center text-sm hover:bg-gray-50">
                  {year}
                </li>
              ))}
            </ul>
          )}
          <div className="flex cursor-pointer items-center">
            <button type="button" onClick={() => changeMonth('prev')}>
              <ArrowBtn direction="left" color="black" />
            </button>
            <button type="button" onClick={() => changeMonth('next')}>
              <ArrowBtn direction="right" color="black" />
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
          isDateLocked={isDateLocked}
          selectionType={selectionType}
          onDateSelect={handleDateSelection}
        />
      </div>
    </div>
  );
}
