import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import instance from '@/apis/api';
import DateChip from '@/components/shared/chip/DateChip';
import { ProgressBar } from '@/components/shared/progress-bar';
import type { GatheringListData } from '@/types/main/types';

interface CardContentProps {
  gathering: GatheringListData;
}

export default function CardContent({ gathering }: CardContentProps) {
  const [hearted, setHearted] = useState(false); // 찜하기 상태
  // dates, closed, maxusers, minusers => api 연결하기

  const toggleHeart = async () => {
    try {
      setHearted(!hearted);

      // API 요청
      await instance.put(`http://localhost:8888/gatheringList/${gathering.gatheringId}`, { ...gathering, hearted: !hearted });
      // console.log(`hearted: ${!hearted}`);
    } finally {
      //
    }
    // catch (error) {
    //   console.error('API 요청에 실패했습니다:', error);
    // }
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
      <Link href={`/main/${gathering.gatheringId}`} className="my-auto flex flex-col gap-1">
        <div className={`mb-2 flex flex-col tablet:mb-0 ${gathering.closed ? 'text-gray-200' : 'text-black'}`}>
          <span className="text-pretty text-16-20-response font-semibold">{gathering.groupName}</span>
          <span className={`text-sub-response font-medium text-gray-400 mobile:font-semibold ${gathering.closed && '!text-gray-200'}`}>
            {gathering.location}
          </span>
        </div>
        <DateChip dateTime={new Date(gathering.gatheringDate)} closed={gathering.closed} />
        <ProgressBar maxValue={gathering.maxUsers} value={gathering.currentUsers} mainValue={gathering.minUsers} design="basics" closed={gathering.closed} />
      </Link>
      <button type="button" onClick={toggleHeart} className="absolute right-heart-m-right top-heart-m-top tablet:top-heart-t-top">
        <Image src={gathering.hearted ? '/icons/heart-active-noround.svg' : '/icons/heart-inactive-noround.svg'} alt="찜하기 버튼" width={28} height={28} />
      </button>
    </div>
  );
}
