/* eslint-disable tailwindcss/no-custom-classname */
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
  const { hearted, gatheringId, groupName, gatheringDate, closed, location, maxUsers, minUsers, currentUsers } = gathering;
  const [isHearted, setIsHearted] = useState(hearted);
  const isLoggedIn = userStore((state) => state.isLoggedIn);
  const queryClient = useQueryClient();

  const toggleHeart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isLoggedIn) {
      Toast('warning', '로그인이 필요합니다.');
      return;
    }
    const endpoint = `/api/gatherings/${gatheringId}/heart`;
    try {
      if (!hearted) {
        await instance.post(endpoint);
        Toast('success', '찜 목록에 추가되었습니다!');
      } else {
        await instance.delete(endpoint);
        Toast('warning', '찜 목록에서 제거되었습니다!');
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
    <Link
      href={`/detail/${gatheringId}`}
      className="relative flex h-1/2 flex-1 flex-col justify-between rounded-2xl rounded-t-none border-t border-t-cardBorder p-2 mobile:h-full mobile:w-1/2 mobile:rounded-bl-none mobile:border-l mobile:border-cardBorder mobile:p-4 tablet:h-1/2 tablet:w-full tablet:border-t tablet:border-none"
    >
      <div className="my-auto flex flex-col gap-1">
        <div className={`mb-2 flex flex-col tablet:mb-0 ${closed ? 'text-gray-200' : 'text-black'}`}>
          <span className="text-pretty text-16-20-response font-semibold">{groupName}</span>
          <span className={`text-sub-response font-medium text-gray-400 mobile:font-semibold ${closed && '!text-gray-200'}`}>
            {gathering.category} | {location}
          </span>
        </div>
        <DateChip dateTime={new Date(gatheringDate)} closed={closed} />
        <ProgressBar maxValue={maxUsers} value={currentUsers} mainValue={minUsers} design="basics" closed={closed} />
      </div>
      <button type="button" onClick={toggleHeart} className="absolute right-heart-m-right top-heart-m-top tablet:top-heart-t-top">
        <Image src={hearted ? '/icons/heart-red.svg' : '/icons/heart-outline.svg'} alt="찜하기 버튼" width={28} height={28} />
      </button>
    </Link>
  );
}
