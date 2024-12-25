import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getDateDetails, getTodayDateString } from '@/utils/calendarUtils';

interface RenderCalendarProps {
  currentDate: Date;
  isApplyDisabled?: boolean;
  onDateSelect: (date: string) => void;
  rangeEnd: string | null;
  rangeStart: string | null;
  selectionType: 'single' | 'range';
}

const today = new Date();

/**
 * RenderCalendar 컴포넌트는 달력의 날짜 그리드를 렌더링하고,
 * 단일 날짜 선택 또는 범위 선택 기능을 제공합니다.
 *
 * @param {Date} currentDate - 현재 선택된 날짜
 * @param {string | null} rangeEnd - 범위  종료 날짜
 * @param {string | null} rangeStart - 단일 or 범위 시작 날짜
 * @param {'single' | 'range'} selectionType - 날짜 선택 모드 ("single" or "range")
 * @param {function} onDateSelect - 날짜 선택 시 호출되는 콜백 함수
 * @param {boolean} isApplyDisabled - 날짜 선택 기능 비활성화 여부
 */

export default function CalendarGrid({ currentDate, onDateSelect, rangeStart, rangeEnd, selectionType, isApplyDisabled }: RenderCalendarProps) {
  const [hoverDate, setHoverDate] = useState<string | null>(null);

  const todayDateString = getTodayDateString();

  const { daysInMonth, firstDayOfMonth, prevMonthDays } = useMemo(() => getDateDetails(currentDate), [currentDate]);

  // 전달의 날짜 계산 로직
  const prevDays = Array.from({ length: firstDayOfMonth }, (_, i) => {
    const day = prevMonthDays - (firstDayOfMonth - i - 1);
    return (
      <div key={`prev-${day}`} className="pointer-events-none py-[6px] text-center text-sm font-medium text-gray-300">
        {day}
      </div>
    );
  });

  // 현재 달의 날짜 계산 로직
  const currentDays = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const date = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`; // YYYY-MM-DD 형식

    const isSelectedStart = rangeStart === date;
    const isSelectedEnd = rangeEnd === date;
    const isToday = todayDateString === date;
    const isInRange = selectionType === 'range' && rangeStart && rangeEnd && date >= rangeStart && date <= rangeEnd;
    const isHoverRange = selectionType === 'range' && rangeStart && hoverDate && !rangeEnd && date >= rangeStart && date <= hoverDate;

    const weekDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).getDay();
    const isSunday = weekDay === 0;
    const isSaturday = weekDay === 6;
    const isPastDate = selectionType === 'single' && new Date(date) < today;

    const textColor = clsx({
      'text-red-500 font-semibold': isSunday,
      'text-ocean font-semibold': isSaturday,
      'text-primary-400 font-bold': isToday,
      'text-white': !isToday && !isSunday && !isSaturday && (isInRange || isHoverRange || isSelectedStart || isSelectedEnd),
      'text-gray-300': isPastDate,
    });

    const hoverClasses = selectionType === 'range' && (!rangeStart || (rangeStart && !rangeEnd)) ? 'hover:bg-blue-700' : '';

    const dayClasses = twMerge(
      'cursor-pointer rounded-lg py-[6px] text-center text-sm font-medium transition duration-200 ease-in-out',
      (isInRange || isSelectedStart || isSelectedEnd) && 'bg-blue-800',
      isHoverRange && 'bg-blue-700',
      isPastDate && 'pointer-events-none',
      textColor,
      hoverClasses,
      isApplyDisabled ? 'cursor-default' : 'cursor-pointer',
    );

    return (
      <div
        key={day}
        className={dayClasses}
        onClick={() => {
          if (selectionType === 'range' && rangeStart && !rangeEnd && date >= rangeStart) {
            onDateSelect(date);
          } else {
            setHoverDate(null);
            onDateSelect(date);
          }
        }}
        onMouseEnter={() => selectionType === 'range' && rangeStart && !rangeEnd && setHoverDate(date)}
        onMouseLeave={() => setHoverDate(null)}
      >
        {day}
      </div>
    );
  });

  // 다음 달의 날짜 계산 로직
  const nextDaysCount = 35 - (prevDays.length + currentDays.length); // 달력의 셀 개수 35개 고정로직

  const nextDays = Array.from({ length: nextDaysCount }, (_, i) => {
    const day = i + 1;

    return (
      <div key={`next-${day}`} className="pointer-events-none py-[6px] text-center text-sm font-medium text-gray-300">
        {day}
      </div>
    );
  });

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{[...prevDays, ...currentDays, ...nextDays]}</>;
}
