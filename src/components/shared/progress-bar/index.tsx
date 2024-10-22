import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ProgressBarProps {
  /** 기준량 */
  maxValue: number;
  /** 비교할 값*/
  value: number;
  style: 'primary' | 'basics' | 'details' | 'black';
}

/**
 * 프로그래스 컴포넌트 입니다.
 *
 * @param maxValue - 기준량
 * @param value - 비교할 값
 * @param style - 'primary' | 'basics' | 'details' | 'black'
 */
export function ProgressBar({ maxValue, value, style }: ProgressBarProps) {
  const [width, setWidth] = useState(0);
  const percentage = (value / maxValue) * 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(percentage);
    }, 300);

    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div>
      <div className="flex items-center justify-center gap-6 font-medium">
        <div className="flex-auto">
          {style === 'basics' && maxValue >= value ? (
            <div className="mb-2 flex items-center text-sm">
              {maxValue === value ? (
                <Image src={'/icons/person-yellow.svg'} alt="icon" width={16} height={16} />
              ) : (
                <Image src={'/icons/person-black.svg'} alt="icon" width={16} height={16} />
              )}
              <span className={maxValue === value ? 'pl-[2px] text-orange-400' : 'pl-[2px]'}>
                {value}/{maxValue}
              </span>
              <Image className="ml-2 h-5 w-5 rounded-full bg-orange-400 p-[2px]" src={'/icons/check.svg'} alt="icon" width={20} height={20} />
              <span className="ml-1 text-orange-400">{value >= 5 && maxValue > value ? '개설확정' : ''}</span>
            </div>
          ) : (
            ''
          )}
          {maxValue >= value ? (
            <div
              className={clsx('h-2 w-full rounded-full', {
                'bg-orange-50': ['primary', 'basics', 'details'].includes(style),
                'bg-gray-200': style === 'black',
              })}
            >
              <div
                className={clsx('h-2 rounded-full transition-all duration-1000 ease-out', {
                  'bg-orange-400': ['primary', 'basics', 'details'].includes(style),
                  'bg-gray-900': style === 'black',
                })}
                style={{ width: `${width}%` }}
              />
            </div>
          ) : (
            '값 초과 입니다'
          )}
        </div>
        {style === 'black' && maxValue >= value ? <div className="text-gray-400">{value}</div> : ''}
      </div>
      {style === 'details' && maxValue >= value ? (
        <div className="mt-2 flex justify-between text-xs">
          <div className="space-x-[6px]">
            <span>최소인원</span>
            <span>5명</span>
          </div>

          <div className="space-x-[6px]">
            <span>최대인원</span>
            <span>{maxValue}명</span>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
