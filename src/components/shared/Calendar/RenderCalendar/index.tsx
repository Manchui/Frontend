interface RenderCalendarProps {
  currentDate: Date;
  handleDateSelection: (date: string) => void;
  selectedDate: string | null;
}

export default function RenderCalendar({ currentDate, handleDateSelection, selectedDate }: RenderCalendarProps) {
  const days = [];

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(); // 31 다음달 마지막일 (현재 달의 마지막 날)
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); // 2 이번달 1일의 요일 (화요일) (현재 달의 1일이 무슨 요일인지 구함)
  const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate(); // 30 전달 마지막 일 (전달의 마지막날을 구함)

  // 현재 달의 첫 번째 요일이 시작되기 전에 표시할 전달(이전 달)의 날짜들을 화면에 출력하기 위한 코드입니다.
  for (let i = firstDayOfMonth - 1; i >= 0; i -= 1) {
    const day = prevMonthDays - i;

    days.push(
      <div key={`prev-${day}`} className="py-[6px] text-center text-[13px] text-gray-300">
        {day}
      </div>,
    );
  }

  // 현재 달의 모든 날짜를 days 배열에 추가하여 HTML구조로 변환시켜줍니다.
  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`; // YYYY-DD-MM 형식

    days.push(
      <div
        key={day}
        className={`cursor-pointer rounded-lg py-[6px] text-center text-[13px] font-semibold ${selectedDate === date && 'bg-orange-600 text-white'}`}
        onClick={() => handleDateSelection(date)}
      >
        {day}
      </div>,
    );
  }

  let nextMonthDay = 1;

  while (days.length < 35) {
    days.push(
      <div key={`next-${nextMonthDay}`} className="py-[6px] text-center text-[13px] text-gray-300">
        {nextMonthDay}
      </div>,
    );
    nextMonthDay += 1;
  }

  return days;
}
