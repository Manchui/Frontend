import { useState } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const today = new Date();

interface RenderCalendarProps {
  currentDate: Date;
  isDateLocked?: boolean;
  onDateSelect: (date: string) => void;
  rangeEnd: string | null;
  rangeStart: string | null;
  selectedDate: string | null;
  selectionType: 'single' | 'range';
}

/**
 * RenderCalendar 컴포넌트는 달력의 날짜 그리드를 렌더링하고,
 * 단일 날짜 선택 또는 범위 선택 기능을 제공합니다.
 *
 * @param {Date} currentDate - 현재 보고 있는 달의 날짜 객체
 * @param {string | null} rangeEnd - 범위 선택에서 종료 날짜
 * @param {string | null} rangeStart - 범위 선택에서 시작 날짜
 * @param {string | null} selectedDate - 선택된 날짜 ("single" 모드일 경우)
 * @param {'single' | 'range'} selectionType - 날짜 선택 모드 ("single" or "range")
 * @param {(date: string) => void} onDateSelect - 날짜 선택 시 호출되는 콜백 함수
 */

export default function RenderCalendar({ currentDate, onDateSelect, selectedDate, rangeStart, rangeEnd, selectionType, isDateLocked }: RenderCalendarProps) {
  const [hoverDate, setHoverDate] = useState<string | null>(null);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(); // 현재 달의 마지막 날
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); // 현재 달의 1일의 요일
  const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate(); // 전달의 마지막 날

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

    const todayDateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const isToday = todayDateString === date;
    const isSelected = selectedDate === date;
    const isInRange = rangeStart && rangeEnd && date >= rangeStart && date <= rangeEnd;
    const isHoverRange = rangeStart && hoverDate && !rangeEnd && date >= rangeStart && date <= hoverDate;

    const weekDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).getDay();
    const isSunday = weekDay === 0;
    const isSaturday = weekDay === 6;

    const isPastDate = selectionType === 'single' && new Date(date) < today;

    const textColor = clsx({
      'text-red-500 font-semibold': isSunday,
      'text-ocean font-semibold': isSaturday,
      'text-primary-400 font-bold': isToday,
      'text-white': !isToday && !isSunday && !isSaturday && (isSelected || isInRange || isHoverRange),
      'text-gray-300': isPastDate,
      // 'text-white': !isPastDate && !isToday && !isSunday && !isSaturday && (isSelected || isInRange || isHoverRange),
    });

    const hoverClasses =
      selectionType === 'single' || (selectionType === 'range' && !rangeStart) || (selectionType === 'range' && rangeStart && !rangeEnd)
        ? 'hover:bg-blue-700'
        : '';

    const dayClasses = twMerge(
      'cursor-pointer rounded-lg py-[6px] text-center text-sm font-medium transition duration-200 ease-in-out',
      (isSelected || isInRange) && 'bg-blue-800',
      isHoverRange && 'bg-blue-700',
      isPastDate && 'pointer-events-none',
      textColor,
      hoverClasses,
      isDateLocked ? 'cursor-default' : 'cursor-pointer',
    );

    return (
      <div
        key={day}
        className={dayClasses}
        onClick={() => {
          if (rangeStart && !rangeEnd && date >= rangeStart) {
            onDateSelect(date);
          } else {
            setHoverDate(null);
            onDateSelect(date);
          }
        }}
        onMouseEnter={() => rangeStart && !rangeEnd && setHoverDate(date)}
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
