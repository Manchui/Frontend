import Image from 'next/image';
/**
Tag 컴포넌트
* @description 오늘 마감되는 모임의 마감시간을 알려주는 컴포넌트
* @param {number} [Hour=''] - 오늘 마감 시간
* @param {'default' | 'Detail'} [Type='default'] - 버튼의 타입
* @todo 반응형 작업하였고 추후 컬러만 변경
*/

type TTagProps = {
  Hour: number;
  Type: 'default' | 'Detail';
};

const baseStyles = 'flex items-center gap-1 h-8 bg-orange-600 py-1 pl-2 pr-4 rounded-bl-xl w-[123px]';

export default function Tag({ Type, Hour }: TTagProps) {
  const variantStyles = Type === 'default' ? ' rounded-tr-[22px] mobile:rounded-tr-[0px] mobile:w-[117px] mobile:pr-2' : 'rounded-tr-[22px]';

  return (
    <div className={`${baseStyles} ${variantStyles}`}>
      <Image src="/icons/alarm.svg" width={24} height={24} alt="alarm" />
      <p className="text-xs leading-4 text-white">오늘 {Hour}시 마감</p>
    </div>
  );
}
