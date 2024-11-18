/* eslint-disable tailwindcss/no-custom-classname */
import { useState } from 'react';
import RedHeart from 'public/icons/RedHeart';
import instance from '@/apis/api';
import DateChip from '@/components/shared/chip/DateChip';
import { ProgressBar } from '@/components/shared/progress-bar';
import { Toast } from '@/components/shared/Toast';
import { userStore } from '@/store/userStore';
import type { GetGatheringResponse } from '@manchui-api';
import { useQueryClient } from '@tanstack/react-query';

interface CardContentProps {
  gathering: GetGatheringResponse['data']['gatheringList'][number];
}

export default function CardContent({ gathering }: CardContentProps) {
  const { hearted, gatheringId, groupName, gatheringDate, closed, location, category, maxUsers, minUsers, currentUsers, heartCounts } = gathering;
  const [isHearted, setIsHearted] = useState(hearted);
  const isLoggedIn = userStore((state) => state.isLoggedIn);
  const queryClient = useQueryClient();

  const toggleHeart = async (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();

    if (!isLoggedIn) {
      Toast('error', '로그인이 필요합니다.');
      return;
    }

    const endpoint = `/api/gatherings/${gatheringId}/heart`;

    try {
      if (!hearted) {
        await instance.post(endpoint);
        Toast('success', '찜 목록에 추가되었습니다!');
      } else {
        await instance.delete(endpoint);
        Toast('error', '찜 목록에서 제거되었습니다!');
      }
      setIsHearted(!isHearted);
      await queryClient.invalidateQueries({ queryKey: ['main'] });
      await queryClient.invalidateQueries({ queryKey: ['bookmark'] });
    } catch (error) {
      console.error('API 요청에 실패했습니다:', error);
      setIsHearted((prevHearted) => !prevHearted);
    }
  };

  return (
    <div className="relative flex h-1/2 min-h-36 w-full cursor-pointer flex-col justify-between overflow-hidden px-5 py-4 mobile:h-full tablet:w-full">
      <div className="mb-3 flex justify-between">
        <div className="flex flex-col">
          <span className="text-pretty text-16-20-response font-bold">{groupName}</span>
          <span className={`pb-3 text-sub-response font-medium text-gray-500 ${closed && '!text-gray-200'}`}>
            {category} | {location}
          </span>
          <DateChip dateTime={new Date(gatheringDate)} closed={closed} />
        </div>
        <div className="relative h-fit">
          <RedHeart
            color={`${hearted ? '#FF4D11' : 'white'}`}
            className={`group size-7 ${hearted ? 'stroke-[#FF4D11] stroke-1' : 'stroke-[#D4D4D4] stroke-2'}`}
            onClick={toggleHeart}
          />
          <span className="absolute right-1/2 translate-x-1/2 text-xs text-gray-200">{heartCounts}</span>
        </div>
      </div>
      <div>
        <ProgressBar maxValue={maxUsers} value={currentUsers} mainValue={minUsers} design="basics" closed={closed} />
      </div>
    </div>
  );
}
