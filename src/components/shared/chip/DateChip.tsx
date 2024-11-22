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
  const dateTimes = new Date(dateTime);
  const month = (dateTimes.getMonth() + 1).toString().padStart(2, '0');
  const day = dateTimes.getDate().toString().padStart(2, '0');
  const time = dateTimes.toTimeString().slice(0, 5);
  const today = new Date();

  const end = today.getTime() >= dateTime.getTime();

  return (
    <time className="flex flex-row">
      <div className={twMerge(cx(setting, end || closed ? 'bg-gray-200 text-gray-400' : 'bg-black text-white'))}>
        {month}월 {day}일
      </div>
      <div className={twMerge(cx(setting, end || closed ? 'bg-gray-200 px-2 text-gray-400' : 'bg-black px-2 text-yellow-400'))}>{time}</div>
    </time>
  );
}
