import cx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface DateProps {
  closed?: boolean;
  dateTime: Date;
}

const setting = 'rounded text-xs mobile:text-xs py-1 px-2 mr-2 font-medium';

/**
 * Date Chip component
 *
 * @param closed - 게시글 취소(삭제) 여부
 * @param dateTime - date and time
 */

export default function DateChip({ dateTime, closed }: DateProps) {
  const dateTimes = dateTime.toISOString();
  const [month, day, time, today] = [dateTimes.slice(5, 7), dateTimes.slice(8, 10), dateTimes.slice(11, 16), new Date()];

  const end = today.getTime() >= dateTime.getTime();

  return (
    <div className="flex flex-row">
      <div className={twMerge(cx(setting, end || closed ? 'bg-gray-200 text-gray-400' : 'bg-black text-white'))}>
        {month}월 {day}일
      </div>
      <div className={twMerge(cx(setting, end || closed ? 'bg-gray-200 px-2 text-gray-400' : 'bg-black px-2 text-yellow-400'))}>{time}</div>
    </div>
  );
}
