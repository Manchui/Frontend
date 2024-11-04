import { useState } from 'react';
import Dropdown from '@/components/main/Dropdown';
import Calendar from '@/components/shared/Calendar';

interface DateDropdownProps {
  handleDateSubmit: ({ start, end }: { end: string; start: string }) => void;
}

export default function DateDropdown({ handleDateSubmit }: DateDropdownProps) {
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [dateDropOpen, setDateDropOpen] = useState(false);

  const handleDateChange = (data: { rangeEnd?: string; rangeStart?: string; selectedDate?: string }) => {
    if (data.rangeStart !== undefined) setStartDate(data.rangeStart);
    if (data.rangeEnd !== undefined) setEndDate(data.rangeEnd);
  };

  const handleSubmit = () => {
    if (startDate && endDate) {
      handleDateSubmit({ start: startDate, end: endDate });
    }
    setDateDropOpen(false);
  };

  return (
    <Dropdown
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
            <span className="hidden mobile:block">모임</span>
            <span>날짜</span>
          </>
        )
      }
      className="left-date-calendar"
    >
      <div className={`flex flex-col gap-4 p-6 ${dateDropOpen ? 'animate-dropdown-open' : 'animate-dropdown-close'}`}>
        <Calendar selectionType="range" onDateChange={handleDateChange} />
        <div className="flex h-[40px] justify-center gap-2 text-13-15-response font-semibold">
          <button type="button" onClick={() => {}} className="w-[120px] rounded-xl border border-blue-800">
            초기화 하기
          </button>
          <button type="button" onClick={handleSubmit} className="w-[120px] rounded-xl bg-blue-800 text-white">
            적용하기
          </button>
        </div>
      </div>
    </Dropdown>
  );
}
