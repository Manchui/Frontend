import cx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface DateProps {
  dateTime: Date;
}

const setting = 'rounded-md text-xs p-1 w-fit mr-2';

/**
 * Date Chip component
 * @param dateTime - date and time
 */

export default function DateChip({ dateTime }: DateProps) {
  const dateTimes = dateTime.toISOString();
  const [month, day, time, today] = [dateTimes.slice(5, 7), dateTimes.slice(8, 10), dateTimes.slice(11, 16), new Date()];

  const end = today.getTime() >= dateTime.getTime();

  return (
    <div className="flex flex-row">
      <div className={twMerge(cx(setting, end ? 'bg-gray-300 text-gray-400' : 'bg-black text-white'))}>
        {month}월 {day}일
      </div>
      <div className={twMerge(cx(setting, end ? 'bg-gray-300 px-2 text-gray-400' : 'bg-black px-2 text-yellow-400'))}>{time}</div>
    </div>
  );
}
