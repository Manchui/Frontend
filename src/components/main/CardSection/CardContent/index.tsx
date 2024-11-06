/* eslint-disable tailwindcss/no-custom-classname */
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import instance from '@/apis/api';
import DateChip from '@/components/shared/chip/DateChip';
import { ProgressBar } from '@/components/shared/progress-bar';
import { Toast } from '@/components/shared/Toast';
import { IS_SERVER } from '@/constants/server';
import type { GetGatheringResponse } from '@manchui-api';
import { useQueryClient } from '@tanstack/react-query';

interface CardContentProps {
  gathering: GetGatheringResponse['data']['gatheringList'][number];
}

export default function CardContent({ gathering }: CardContentProps) {
  const [hearted, setHearted] = useState(gathering.hearted);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const toggleHeart = async () => {
    if (!isLoggedIn) {
      Toast('warning', '로그인이 필요합니다.');
      return;
    }

    const updatedHearted = !hearted;
    setHearted(updatedHearted);
    const endpoint = `/api/gatherings/${gathering.gatheringId}/heart`;

    try {
      if (updatedHearted) {
        await instance.post(endpoint);
        Toast('success', '찜 목록에 추가되었습니다!');
      } else {
        await instance.delete(endpoint);
        Toast('success', '찜 목록에서 제거되었습니다!');
      }

      await queryClient.invalidateQueries({ queryKey: ['main'] });
    } catch (e) {
      console.error('API 요청에 실패했습니다:', e);
      setHearted((prevHearted) => !prevHearted);
    }
  };

  useEffect(() => {
    if (!IS_SERVER) {
      setIsLoggedIn(!!localStorage.getItem('accessToken'));
    }
  }, []);

  return (
    <div className="border-cardBorder relative flex h-1/2 flex-1 flex-col justify-between rounded-2xl rounded-t-none border border-t-0 p-2 mobile:h-full mobile:w-1/2 mobile:p-4 tablet:h-1/2 tablet:w-full">
      <Link href={`/detail/${gathering.gatheringId}`} className="my-auto flex flex-col gap-1">
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
        <Image src={gathering.hearted ? '/icons/heart-red.svg' : '/icons/heart-outline.svg'} alt="찜하기 버튼" width={28} height={28} />
      </button>
    </div>
  );
}
