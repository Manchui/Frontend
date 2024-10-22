import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface ProgressBarProps {
  /** 기준량 */
  maxValue: number;
  /** 비교할 값*/
  minValue: number;
  color: 'primary' | 'black';
}

/**
 * @param maxValue - 기준량
 * @param minValue - 비교할 값
 * @param color - 'primary' | 'black'
 */
export function ProgressBar({ maxValue, minValue, color }: ProgressBarProps) {
  const [width, setWidth] = useState(0);
  const percentage = (minValue / maxValue) * 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(percentage);
    }, 300);

    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="flex items-center justify-center gap-6">
      <div className="flex-auto">
        <div
          className={clsx('h-2 w-full rounded-full', {
            'bg-orange-50': color === 'primary',
            'bg-gray-200': color === 'black',
          })}
        >
          <div
            className={clsx('h-2 rounded-full transition-all duration-1000 ease-out', {
              'bg-orange-400': color === 'primary',
              'bg-gray-900': color === 'black',
            })}
            style={{ width: `${width}%` }}
          />
        </div>
      </div>
    </div>
  );
}
