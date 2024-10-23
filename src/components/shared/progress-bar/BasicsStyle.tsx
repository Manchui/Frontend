import Image from 'next/image';

import type { BaseProgressBarProps } from '.';

export function BasicsStyle({ maxValue, mainValue = 0, value }: BaseProgressBarProps) {
  return (
    <div className="mb-2 flex items-center text-sm">
      {maxValue === value ? (
        <Image src="/icons/person-yellow.svg" alt="icon" width={16} height={16} />
      ) : (
        <Image src="/icons/person-black.svg" alt="icon" width={16} height={16} />
      )}
      <span className={maxValue === value ? 'pl-[2px] text-orange-400' : 'pl-[2px]'}>
        {value}/{maxValue}
      </span>
      {value >= mainValue && maxValue > value && (
        <>
          <Image className="ml-2 size-5 rounded-full bg-orange-400 p-[2px]" src="/icons/check.svg" alt="icon" width={20} height={20} />
          <span className="ml-1 text-orange-400">개설확정</span>
        </>
      )}
    </div>
  );
}
