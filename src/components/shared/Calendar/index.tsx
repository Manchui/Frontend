/* eslint-disable tailwindcss/no-custom-classname */
import { useCallback, useState } from 'react';
import clsx from 'clsx';
import CalendarGrid from '@/components/shared/Calendar/CalendarGrid';
import CalendarSelector from '@/components/shared/Calendar/CalendarSelector';

interface CalendarProps {
  endDate?: string | null;
  isApplyDisabled?: boolean;
  onDateChange: (data: { rangeEnd?: string; rangeStart?: string }) => void;
  selectionType: 'single' | 'range';
  startDate: string | null;
}

/**
 * 달력 컴포넌트 입니다.
 * 단일 날짜 선택("single"), 범위 선택("range") 모드를 지원합니다.
 *
 * @param {"single" | "range"} selectionType - 단일 날짜(모임 생성) or 범위 선택 모드(모임 찾기)
 * @param {function} onDateChange - 선택한 날짜를 전달하는 콜백 함수
 * @param {string | null} startDate - 시작 날짜, 단일 or 범위 선택 모드에서 사용
 * @param {string | null} endDate - 종료 날짜, 범위 선택 모드에서 사용
 * @param {boolean} isApplyDisabled - 날짜 선택 기능 비활성화 여부
 */

export default function Calendar({ selectionType, onDateChange, startDate, endDate, isApplyDisabled }: CalendarProps) {
  const [dropOpen, setDropOpen] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateSelection = useCallback(
    (date: string) => {
      if (isApplyDisabled) return;

      if (selectionType === 'single') {
        onDateChange({ rangeStart: date });
      } else if (selectionType === 'range') {
        if (!startDate || endDate) {
          onDateChange({ rangeStart: date });
        } else if (date > startDate) {
          onDateChange({ rangeEnd: date });
        }
      }
    },
    [endDate, isApplyDisabled, onDateChange, selectionType, startDate],
  );

  return (
    <div className="mx-auto size-[250px]">
      <div className="flex items-center justify-between">
        <CalendarSelector dropOpen={dropOpen} setDropOpen={setDropOpen} currentDate={currentDate} setCurrentDate={setCurrentDate} />
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
        <CalendarGrid
          rangeEnd={endDate ?? null}
          rangeStart={startDate ?? null}
          currentDate={currentDate}
          isApplyDisabled={isApplyDisabled}
          selectionType={selectionType}
          onDateSelect={handleDateSelection}
        />
      </div>
    </div>
  );
}
