import { useState } from 'react';
import Dropdown from '@/components/main/Dropdown';
import Calendar from '@/components/shared/Calendar';

export default function DateDropdown() {
  const [dateDropOpen, setDateDropOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<{ rangeEnd?: string; rangeStart?: string; selectedDate?: string }>({});

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

  return (
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
