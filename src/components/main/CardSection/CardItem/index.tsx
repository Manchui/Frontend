import type { MouseEvent } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { instance } from '@/apis/api';
import DateChip from '@/components/shared/chip/DateChip';
import { ProgressBar } from '@/components/shared/progress-bar';
import { Toast } from '@/components/shared/Toast';
import useInternalRouter from '@/hooks/useInternalRouter';
import { userStore } from '@/store/userStore';
import type { GetGatheringResponse } from '@manchui-api';
import { useQueryClient } from '@tanstack/react-query';

export default function CardItem({ data }: { data: GetGatheringResponse['data']['gatheringList'][number] }) {
  const { gatheringId, gatheringImage, groupName, category, location, hearted, gatheringDate, closed, maxUsers, minUsers, currentUsers } = data;

  const router = useInternalRouter();

  const [isHearted, setIsHearted] = useState(hearted);

  const isLoggedIn = userStore((state) => state.isLoggedIn);

  const queryClient = useQueryClient();

  const toggleHeart = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

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
      console.error('찜하기 실패:', error);
      setIsHearted((prevHearted) => !prevHearted);
    }
  };

  return (
    <li key={gatheringId} className="group cursor-pointer" onClick={() => router.push(`/detail/${gatheringId}`)}>
      <div className="relative mb-4 overflow-hidden rounded-2xl">
        <Image
          src={gatheringImage}
          alt={groupName}
          width={400}
          height={200}
          priority
          sizes="100vw"
          className="h-[170px] w-full object-cover duration-300 group-hover:scale-110"
        />
        <div className="absolute left-0 top-0 h-10 w-full bg-gradient-to-b from-black/50 to-transparent">
          <button type="button" className="absolute right-4 top-2" onClick={toggleHeart}>
            <Image src={`${hearted ? '/icons/save-filled.svg' : '/icons/save.svg'}`} alt="찜하기" width={24} height={24} />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="truncate font-semibold">
          [{category} | {location}] {groupName}
        </p>
        <DateChip dateTime={new Date(gatheringDate)} closed={closed} />
        <ProgressBar maxValue={maxUsers} value={currentUsers} mainValue={minUsers} design="basics" closed={closed} />
      </div>
    </li>
  );
}
