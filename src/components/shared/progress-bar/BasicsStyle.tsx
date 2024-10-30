import cx from 'clsx';
import Image from 'next/image';

import type { BaseProgressBarProps } from '.';

export function BasicsStyle({ maxValue, mainValue = 0, value, closed }: BaseProgressBarProps) {
  const isFull = value === maxValue;
  const isConfirmed = value >= mainValue;

  return (
    <div className="mb-3 flex items-center text-sm font-semibold text-blue-800">
      {maxValue === value || closed ? (
        <Image src="/icons/person-gray.svg" alt="icon" width={16} height={16} className="size-5" />
      ) : (
        <Image src="/icons/person-black.svg" alt="icon" width={16} height={16} className="size-5" />
      )}
      <span className={cx('pl-[2px]', { 'text-gray-200': isFull || closed })}>
        {value} / {maxValue}
      </span>
      {isConfirmed && (
        <>
          <Image
            className={cx('ml-2 rounded-full p-[2px] mobile:size-5', { 'bg-blue-800': !isFull }, { 'bg-gray-200': isFull || closed })}
            src="/icons/check.svg"
            alt="icon"
            width={16}
            height={16}
          />
          <span className={cx('ml-1', { 'text-blue-800': !isFull }, { 'text-gray-200': isFull }, { 'text-gray-300': closed })}>개설확정</span>
        </>
      )}
    </div>
  );
}
