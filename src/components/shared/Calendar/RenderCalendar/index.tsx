interface CalendarGridProps {
  currentDate: Date;
  onDateSelect: (date: string) => void;
  selectedDate: string | null;
  rangeStart: string | null;
  rangeEnd: string | null;
  selectionType: 'single' | 'range';
}

export default function RenderCalendar({ currentDate, onDateSelect, selectedDate, rangeStart, rangeEnd, selectionType }: CalendarGridProps) {
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(); // 현재 달의 마지막 날
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); // 현재 달의 1일의 요일
  const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate(); // 전달의 마지막 날

  // 전달의 날짜 계산
  const prevDays = Array.from({ length: firstDayOfMonth }, (_, i) => {
    const day = prevMonthDays - i;
    return (
      <div key={`prev-${day}`} className="py-[6px] text-center text-sm font-medium text-gray-300">
        {day}
      </div>
    );
  });

  // 현재 달의 날짜 계산
  const currentDays = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const date = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`; // YYYY-MM-DD 형식

    const today = new Date();
    const todayDateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const isToday = todayDateString === date;
    const isSelected = selectedDate === date;
    const isInRange = rangeStart && rangeEnd && date >= rangeStart && date <= rangeEnd;

    return (
      <div
        key={day}
        className={`cursor-pointer rounded-lg py-[6px] text-center text-sm font-medium hover:bg-[#3B494F] hover:text-white ${isSelected && 'bg-[#262F33] text-white'} ${isToday && !isSelected && 'text-[#F7C312]'} ${selectionType === 'range' && isInRange ? 'bg-[#262F33] text-white' : ''} }`}
        onClick={() => onDateSelect(date)}
      >
        {day}
      </div>
    );
  });

  // 다음 달의 날짜 계산
  const nextDaysCount = 35 - (prevDays.length + currentDays.length); // 달력의 셀 개수를 35개로 맞추기 위한 로직입니다.

  const nextDays = Array.from({ length: nextDaysCount }, (_, i) => {
    const day = i + 1;

    return (
      <div key={`next-${day}`} className="py-[6px] text-center text-sm font-medium text-gray-300">
        {day}
      </div>
    );
  });

  return <>{[...prevDays, ...currentDays, ...nextDays]}</>;
}
