import { useCallback, useState } from 'react';
import Dropdown from '@/components/main/Dropdown';
import Calendar from '@/components/shared/Calendar';
import { Toast } from '@/components/shared/Toast';
import { useSetDateEnd, useSetDateStart } from '@/store/useFilterStore';

export default function DateDropdown() {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [dateDropOpen, setDateDropOpen] = useState<boolean>(false);
  const [isApplyDisabled, setIsApplyDisabled] = useState<boolean>(false);

  const setDateStart = useSetDateStart();
  const setDateEnd = useSetDateEnd();

  const handleDateChange = (data: { rangeEnd?: string; rangeStart?: string }) => {
    if (data.rangeStart) {
      setStartDate(data.rangeStart);
      setEndDate(null);
      setIsApplyDisabled(false);
    }
    if (data.rangeEnd) {
      setEndDate(data.rangeEnd);
      setIsApplyDisabled(false);
    }
  };

  const handleSubmit = useCallback(() => {
    if (startDate && endDate) {
      setDateStart(startDate);
      setDateEnd(endDate);
      setIsApplyDisabled(true);
      Toast('success', '날짜가 적용되었습니다.');
      setDateDropOpen(false);
    } else {
      Toast('error', '날짜 범위를 선택하세요');
    }
  }, [endDate, setDateEnd, setDateStart, startDate]);

  const handleInitClick = useCallback(() => {
    if (!startDate && !endDate) {
      Toast('error', '날짜를 선택하세요');
      return;
    }

    if (startDate && endDate) {
      setStartDate(null);
      setEndDate(null);
      setDateStart(undefined);
      setDateEnd(undefined);
      setIsApplyDisabled(false);
      setDateDropOpen(false);
      Toast('info', '날짜 선택이 초기화되었습니다.');
    }
  }, [startDate, endDate, setDateEnd, setDateStart]);

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
      <div className={`flex flex-col gap-4 p-6 ${dateDropOpen ? 'animate-dropdown-open' : 'animate-dropdown-close'}`}>
        <Calendar selectionType="range" onDateChange={handleDateChange} startDate={startDate} endDate={endDate} isApplyDisabled={isApplyDisabled} />
        <div className="flex h-[40px] justify-center gap-2 text-13-16-response font-semibold">
          <button type="button" onClick={handleInitClick} className="w-[120px] rounded-xl border border-blue-800 hover:bg-black/10">
            초기화 하기
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isApplyDisabled}
            className={`w-[120px] rounded-xl ${isApplyDisabled ? 'cursor-not-allowed bg-gray-300 text-gray-600' : 'bg-blue-800 text-white hover:bg-blue-700'}`}
          >
            적용하기
          </button>
        </div>
      </div>
    </Dropdown>
  );
}
