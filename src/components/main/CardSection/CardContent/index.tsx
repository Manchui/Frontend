// import { useState } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import instance from '@/apis/api';
// import instance from '@/apis/api';
import DateChip from '@/components/shared/chip/DateChip';
import { ProgressBar } from '@/components/shared/progress-bar';
import type { GetGatheringResponse } from '@manchui-api';

interface CardContentProps {
  gathering: GetGatheringResponse['data']['gatheringList'][number];
}

const API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6ImFjY2VzcyIsInVzZXJFbWFpbCI6InRlc3QxQHRlc3QuY29tIiwiaWF0IjoxNzMwNjg4ODM5LCJleHAiOjE3MzA2OTA2Mzl9.KsPQ0cGKyDakU6VZfKWE8P26mfJ_cKMUCTePLzTK9gg';

export default function CardContent({ gathering }: CardContentProps) {
  const [hearted, setHearted] = useState(gathering.hearted);

  const toggleHeart = async () => {
    try {
      // 토글 상태를 미리 반영하여 사용자에게 즉각적인 피드백 제공
      setHearted(!hearted);

      // API 요청
      await instance.post(
        `/api/gatherings/${gathering.gatheringId}/heart`,
        { hearted: !hearted },
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        },
      );

      console.log(`hearted: ${!hearted}`);
    } catch (error) {
      console.error('API 요청에 실패했습니다:', error);

      // 요청 실패 시 상태를 다시 복구
      setHearted(!hearted);
    }
  };

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
