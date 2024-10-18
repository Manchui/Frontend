// tag 경우
// large- 모임 찾기 큰화면
// small- 모임 찾기 작은화면, 모임 상세
// 찾기 페이지에서 variant - 반응형까지
// 상세 페이지에서 variant - 디자인 1개
// 반응형을 고려해야해서 두개를 각자
// tag 기능 ~시 마감 표현
// 디자인 변경은 div에만 -> variant를 div에
// props를 받아서  시간으로
import Image from 'next/image';

// 타입 정의
type TTagProps = {
  Hour: number;
  Variant: 'Search' | 'Detail';
};

const baseStyles = 'flex items-center gap-1 h-8 bg-orange-600 py-1 pl-2 pr-4 rounded-bl-xl w-[123px]';

export default function Tag({ Variant, Hour }: TTagProps) {
  const variantStyles = Variant === 'Search' ? ' rounded-tr-[22px] mobile:rounded-tr-[0px] mobile:w-[117px] mobile:pr-2' : 'rounded-tr-[22px]';

  return (
    <div className={`${baseStyles} ${variantStyles}`}>
      <Image src="/icons/alarm.svg" width={24} height={24} alt="alarm" />
      <p className="text-xs leading-4 text-white">오늘 {Hour}시 마감</p>
    </div>
  );
}
