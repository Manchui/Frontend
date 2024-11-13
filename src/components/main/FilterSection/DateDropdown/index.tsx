import { useCallback, useState } from 'react';
import Dropdown from '@/components/main/Dropdown';
import Calendar from '@/components/shared/Calendar';
import { Toast } from '@/components/shared/Toast';
import { useSetDateEnd, useSetDateStart } from '@/store/useFilterStore';

export default function DateDropdown() {
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [dateDropOpen, setDateDropOpen] = useState(false);
  const [isDateLocked, setIsDateLocked] = useState(false);

  const setDateStart = useSetDateStart();
  const setDateEnd = useSetDateEnd();

  const handleDateChange = useCallback(
    (data: { rangeEnd?: string; rangeStart?: string; selectedDate?: string }) => {
      if (isDateLocked) return;
      if (data.rangeStart !== undefined) setStartDate(data.rangeStart);
      if (data.rangeEnd !== undefined) setEndDate(data.rangeEnd);
    },
    [isDateLocked],
  );

  const handleSubmit = useCallback(() => {
    if (startDate && endDate) {
      setDateStart(startDate);
      setDateEnd(endDate);
      setIsDateLocked(true);
      Toast('success', '날짜가 적용되었습니다.');
    }
    setDateDropOpen(false);
  }, [endDate, setDateEnd, setDateStart, startDate]);

  const handleInitClick = useCallback(() => {
    if (!startDate && !endDate) {
      Toast('warning', '날짜를 선택하세요');
      return;
    }

    if (setDateStart && setDateEnd) {
      setStartDate(undefined);
      setEndDate(undefined);
      setDateEnd(undefined);
      setDateStart(undefined);
      setIsDateLocked(false);
      setDateDropOpen(false);
      Toast('success', '날짜 선택이 초기화되었습니다.');
    }
  }, [startDate, endDate, setDateStart, setDateEnd]);

  return (
    <Dropdown
      value={endDate}
      dropOpen={dateDropOpen}
      isOpen={dateDropOpen}
      setIsOpen={setDateDropOpen}
      buttonLabel={
        startDate && endDate ? (
          <span>
            {startDate.replace(/-/g, '.')} - {endDate.replace(/-/g, '.')}
          </span>
        ) : (
          <>
            <span className="hidden tablet:block">모임</span>
            <span>날짜</span>
          </>
        )
      }
      className="left-date-calendar"
    >
      <div className={`flex flex-col gap-4 border-2 border-black p-6 ${dateDropOpen ? 'animate-dropdown-open' : 'animate-dropdown-close'}`}>
        <Calendar
          key={`${startDate}-${endDate}`}
          selectionType="range"
          onDateChange={handleDateChange}
          prevRangeStart={startDate}
          prevRangeEnd={endDate}
          isDateLocked={isDateLocked}
        />
        <div className="flex h-[40px] justify-center gap-2 text-13-16-response font-semibold">
          <button type="button" onClick={handleInitClick} className="w-[120px] border-2 border-black hover:bg-black hover:text-white">
            초기화 하기
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isDateLocked}
            className={`w-[120px] ${isDateLocked ? 'cursor-not-allowed bg-gray-300 text-gray-600' : 'bg-black text-white hover:border-2 hover:border-black hover:bg-white hover:text-black'}`}
          >
            적용하기
          </button>
        </div>
      </div>
    </Dropdown>
  );
}
