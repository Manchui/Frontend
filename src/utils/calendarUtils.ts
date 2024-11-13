// 현재 달의 마지막 날(해당 달의 일 수), 현재 달의 1일의 요일, 전달의 마지막 날을 계산합니다.
export function getDateDetails(currentDate: Date) {
  return {
    daysInMonth: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(), // 현재 달의 마지막 날
    firstDayOfMonth: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(), // 현재 달의 1일의 요일
    prevMonthDays: new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate(), // 전달의 마지막 날
  };
}

// 오늘 날짜를 'YYYY-MM-DD' 형식의 문자열로 반환
export function getTodayDateString() {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}
