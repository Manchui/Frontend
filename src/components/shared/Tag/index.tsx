import cx from 'clsx';
import Image from 'next/image';

type TagProps = {
  Hour?: number;
  Type: 'default' | 'detail';
  className?: string;
  finish?: boolean;
  simple?: boolean;
};

/**
Tag 컴포넌트
* @description 모집 마감되는 모임의 마감을 알려주는 컴포넌트
* @param {number} Hour - 오늘 마감시간
* @param {'default' | 'detail'} Type - 버튼의 타입
* @param {boolean} finish - 모집 마감 여부
* @param {string} className - tailwind.css 적용 가능
* @param {boolean} simple - 스타일 
*/
export default function Tag({ Type, Hour, className, finish = false, simple = false }: TagProps) {
  const BaseStyle = 'flex h-8 items-center gap-1 rounded-bl-xl py-1 pl-2 pr-4';

  const now = new Date();
  const nowHour = now.getHours();

  const dayLabel = Hour !== undefined && Hour < nowHour ? '내일' : '오늘';

  return (
    <>
      {finish === false && (
        <div
          className={cx('bg-blue-800', BaseStyle, {
            'rounded-tr-2xl mobile:rounded-tr-[0px] mobile:pr-[10px]': Type === 'default',
            'rounded-tr-2xl': Type === 'detail',
            className,
          })}
        >
          <Image src="/icons/alarm.svg" width={24} height={24} alt="alarm" />
          {simple === false && (
            <p className="text-balance text-xs leading-4 text-white">
              {dayLabel} {Hour}시 마감
            </p>
          )}
        </div>
      )}
      {finish === true && (
        <div
          className={cx('bg-yellow-50', BaseStyle, {
            'rounded-tr-2xl mobile:rounded-tr-[0px] mobile:pr-[10px]': Type === 'default',
            'rounded-tr-2xl': Type === 'detail',
            className,
          })}
        >
          <Image src="/icons/alarm-finish.svg" width={24} height={24} alt="alarm" />
          <p className="text-xs leading-4 text-yellow-400">모집 마감</p>
        </div>
      )}
    </>
  );
}
