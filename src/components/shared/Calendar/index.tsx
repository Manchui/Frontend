import Image from 'next/image';
import { useState } from 'react';
import RenderCalendar from '@/components/shared/Calendar/RenderCalendar';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * 달력 컴포넌트 입니다.
 */

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateSelection = (date: string) => {
    if (selectedDate === date) {
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
    }
  };

  return (
    <div className="mx-auto max-w-[250px]">
      <div className="flex items-center justify-between">
        <Image
          src="./assets/icons/left.svg"
          alt="Previous Btn"
          width={22}
          height={22}
          className="cursor-pointer"
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
        />
        <span className="text-sm font-semibold text-gray-800">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </span>
        <Image
          src="./assets/icons/right.svg"
          alt="Previous Btn"
          width={22}
          height={22}
          className="cursor-pointer"
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
        />
      </div>
      <div className="mt-3 grid grid-cols-7 gap-[2px]">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-bold text-gray-800">
            {day}
          </div>
        ))}
        <RenderCalendar currentDate={currentDate} onDateSelect={handleDateSelection} selectedDate={selectedDate} />
      </div>
    </div>
  );
}
