import { useState } from 'react';
import Calendar from '@/components/shared/Calendar';
import RootLayout from '@/components/shared/RootLayout';

export default function MainPage() {
  const [selectedDates, setSelectedDates] = useState<{ rangeEnd?: string; rangeStart?: string; selectedDate?: string }>({});

  const handleDateChange = (data: { rangeEnd?: string; rangeStart?: string; selectedDate?: string }) => {
    setSelectedDates(data);
  };

  const handleSubmit = () => {
    if (selectedDates.selectedDate) {
      console.log('선택된 단일 날짜:', selectedDates.selectedDate);
    } else if (selectedDates.rangeStart && selectedDates.rangeEnd) {
      console.log('선택된 범위:', selectedDates.rangeStart, '부터', selectedDates.rangeEnd, '까지');
    } else {
      console.log('날짜가 선택되지 않았습니다.');
    }
  };

  return (
    <RootLayout>
      <div className="flex flex-col items-center justify-center gap-4">
        <div>위에는 gnb 넣으면 됩니다.</div>
        <Calendar selectionType="single" onDateChange={handleDateChange} />
        <Calendar selectionType="range" onDateChange={handleDateChange} />
        <button type="button" className="mt-4 w-full rounded bg-blue-600 p-2 text-white" onClick={handleSubmit}>
          제출
        </button>
      </div>
    </RootLayout>
  );
}
