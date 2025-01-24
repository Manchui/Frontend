import { useCallback, useMemo } from 'react';
import Image from 'next/image';

interface CalendarSelectorProps {
  currentDate: Date;
  dropOpen: boolean;
  setCurrentDate: (date: Date) => void;
  setDropOpen: (state: boolean) => void;
}

export default function CalendarSelector({ setDropOpen, dropOpen, currentDate, setCurrentDate }: CalendarSelectorProps) {
  const years = useMemo(() => Array.from({ length: 10 }, (_, i) => currentDate.getFullYear() - 4 + i), [currentDate]);

  const changeYear = useCallback(
    (newYear: number) => {
      setCurrentDate(new Date(newYear, currentDate.getMonth(), 1));
      setDropOpen(false);
    },
    [currentDate, setCurrentDate, setDropOpen],
  );

  const changeMonth = useCallback(
    (direction: 'prev' | 'next') => {
      setCurrentDate(new Date(currentDate.getFullYear(), direction === 'prev' ? currentDate.getMonth() - 1 : currentDate.getMonth() + 1, 1));
    },
    [currentDate, setCurrentDate],
  );

  return (
    <div className="relative flex w-full items-center justify-between">
      <span onClick={() => setDropOpen(!dropOpen)} className="flex cursor-pointer items-center text-md font-semibold tablet:text-lg">
        {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월{' '}
        <Image src="/icons/arrow-right.svg" alt="오른쪽" className={`${dropOpen ? 'rotate-90' : '-rotate-90'} duration-300`} width={24} height={24} />
      </span>
      {dropOpen && (
        <ul
          className={`absolute top-full z-50 max-h-48 w-24 overflow-y-auto rounded-xl bg-white drop-shadow-2xl ${
            dropOpen ? 'animate-dropdown-open' : 'animate-dropdown-close'
          }`}
        >
          {years.map((year) => (
            <li key={year} onClick={() => changeYear(year)} className="py-1 text-center text-sm hover:bg-gray-50">
              {year}
            </li>
          ))}
        </ul>
      )}
      <div className="flex cursor-pointer items-center">
        <button type="button" onClick={() => changeMonth('prev')}>
          <Image src="/icons/arrow-right.svg" alt="오른쪽" className="rotate-180" width={24} height={24} />
        </button>
        <button type="button" onClick={() => changeMonth('next')}>
          <Image src="/icons/arrow-right.svg" alt="오른쪽" width={24} height={24} />
        </button>
      </div>
    </div>
  );
}
