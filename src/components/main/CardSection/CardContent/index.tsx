import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DateChip from '@/components/shared/chip/DateChip';
import { ProgressBar } from '@/components/shared/progress-bar';
import { closed, DATES, maxUsers, minUsers } from '@/constants/main/contants';

export default function CardContent() {
  const [hearted, setHearted] = useState(false); // 찜하기 상태
  // dates, closed, maxusers, minusers => api 연결하기

  const toggleHeart = () => {
    // 찜하기 토글 버튼
    setHearted((prevHearted) => {
      const newHearted = !prevHearted;
      // console.log('찜 상태:', newHearted);
      return newHearted;
    });
  };

  // const toggleHeart = async () => {
  //   try {
  //     const newHeartedValue = !hearted;
  //     setHearted(newHeartedValue);

  //     // API 요청
  //     await axios.post('/api/favorite', { hearted: newHeartedValue });
  //     console.log(`hearted: ${newHeartedValue}`);
  //   } catch (error) {
  //     console.error('API 요청에 실패했습니다:', error);
  //   }
  // };

  return (
    <div className="relative flex h-1/2 flex-1 flex-col justify-between p-2 mobile:h-full mobile:w-1/2 mobile:p-4 tablet:h-1/2 tablet:w-full">
      <Link href="/main/1" className="my-auto flex flex-col gap-1">
        <div className={`mb-2 flex flex-col tablet:mb-0 ${closed ? 'text-gray-200' : 'text-black'}`}>
          <span className="text-pretty text-16-20-response font-semibold mobile:font-bold">달램핏 마인드풀니스</span>
          <span className={`text-sub-response font-medium text-gray-400 mobile:font-semibold ${closed && '!text-gray-200'}`}>을지로 3가</span>
        </div>
        <DateChip dateTime={DATES} closed={closed} />
        <ProgressBar maxValue={maxUsers} value={minUsers} design="basics" closed={closed} />
      </Link>
      <button type="button" onClick={toggleHeart} className="absolute right-heart-m-right top-heart-m-top tablet:top-heart-t-top">
        <Image src={hearted ? '/icons/heart-active-noround.svg' : '/icons/heart-inactive-noround.svg'} alt="찜하기 버튼" width={28} height={28} />
      </button>
    </div>
  );
}
