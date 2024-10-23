import { useEffect, useState } from 'react';
import cx from 'clsx';

import { BasicsStyle } from './BasicsStyle';
import { DetailsStyle } from './DetailsStyle';

export interface BaseProgressBarProps {
  /** details 이미지 개수 test */
  imgLength?: number;
  /** 최소 값 */
  mainValue?: number;
  /** 기준량 */
  maxValue: number;
  /** api userList */
  userList?: [];
  /** 비교할 값 */
  value: number;
}

interface ProgressBarProps extends BaseProgressBarProps {
  style: 'primary' | 'basics' | 'details' | 'simple';
}

/**
 * 프로그래스 컴포넌트 입니다.
 *
 * @param maxValue - 기준량
 * @param value - 비교할 값
 * @param style - 'primary' | 'basics' | 'details' | 'simple'
 * @param mainValue - 최소 값
 * @param userList - api userList
 */
export function ProgressBar({ maxValue, value, style, mainValue = 0, imgLength = 0, userList }: ProgressBarProps) {
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
            <BasicsStyle maxValue={maxValue} mainValue={mainValue} value={value} />
          ) : (
            style === 'details' &&
            maxValue >= value && (
              <DetailsStyle maxValue={maxValue} mainValue={mainValue} value={value} location="up" imgLength={imgLength} userList={userList} />
            )
          )}
          {maxValue >= value ? (
            <div
              className={cx('h-2 w-full rounded-full', {
                'bg-orange-50': ['primary', 'basics', 'details'].includes(style),
                'bg-gray-200': style === 'simple',
              })}
            >
              <div
                className={cx('h-2 rounded-full transition-all duration-1000 ease-out', {
                  'bg-orange-400': ['primary', 'basics', 'details'].includes(style),
                  'bg-gray-900': style === 'simple',
                })}
                style={{ width: `${width}%` }}
              />
            </div>
          ) : (
            '값 초과 입니다'
          )}
        </div>
        {style === 'simple' && maxValue >= value && <div className="w-6 text-gray-400">{value}</div>}
      </div>
      {style === 'details' && maxValue >= value && <DetailsStyle maxValue={maxValue} mainValue={mainValue} value={value} location="down" />}
    </div>
  );
}
