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

  // const toggleHeart = async (e: React.MouseEvent<HTMLDivElement>) => {
  //   e.preventDefault();

  //   if (!isLoggedIn) {
  //     Toast('error', '로그인이 필요합니다.');
  //     return;
  //   }

  //   const endpoint = `/api/gatherings/${gatheringId}/heart`;

  //   try {
  //     if (!hearted) {
  //       await instance.post(endpoint);
  //       Toast('success', '찜 목록에 추가되었습니다!');
  //     } else {
  //       await instance.delete(endpoint);
  //       Toast('error', '찜 목록에서 제거되었습니다!');
  //     }
  //     setIsHearted(!isHearted);
  //     await queryClient.invalidateQueries({ queryKey: ['main'] });
  //     await queryClient.invalidateQueries({ queryKey: ['bookmark'] });
  //   } catch (error) {
  //     console.error('API 요청에 실패했습니다:', error);
  //     setIsHearted((prevHearted) => !prevHearted);
  //   }
  // };

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
          <RedHeart color={`${hearted ? '#FF4D11' : '#D4D4D4'}`} className="group size-7" onClick={toggleHeart} />
          <span className="absolute right-1/2 translate-x-1/2 text-xs text-gray-200">{heartCounts}</span>
        </div>
        {/* <div className="relative h-fit">
          <RedHeart
            color={`${hearted ? '#FF4D11' : '#D4D4D4'}`}
            className={`group size-7 ${hearted ? 'animate-likeEffect' : 'animate-dislikeEffect'}`}
            onClick={toggleHeart}
          />
          <span className="absolute right-1/2 translate-x-1/2 text-xs text-gray-200">{heartCounts}</span>
          <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs font-bold text-[#FF5353] shadow-md group-hover:flex">
            찜하기
            <div className="absolute right-[-4px] top-1/2 size-0 -translate-y-1/2 border-y-4 border-l-4 border-y-transparent border-l-gray-800" />
          </div>
        </div> */}
        {/* <div onClick={toggleHeart} className="group relative flex h-fit items-center gap-1 place-self-end rounded-md bg-black p-1">
          {hearted ? (
            <svg viewBox="0 0 256 256" className="animate-dislikeEffect size-5">
              <rect fill="none" height="256" width="256" />
              <path
                d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
                stroke-width="20px"
                stroke="0"
                fill="#FF5353"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 256 256" className="animate-likeEffect size-5">
              <rect fill="none" height="256" width="256" />
              <path
                d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
                stroke-width="20px"
                stroke="#FFF"
                fill="none"
              />
            </svg>
          )}
          <span className="text-xs text-white">{heartCounts}</span>
          <div className="absolute left-1/2 top-[-40px] hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs font-bold text-[#FF5353] shadow-md group-hover:flex">
            찜하기
            <div className="absolute bottom-[-6px] left-1/2 size-0 -translate-x-1/2 border-x-8 border-t-8 border-x-transparent border-t-gray-800" />
          </div>
        </div> */}
      </div>
      <div>
        <ProgressBar maxValue={maxUsers} value={currentUsers} mainValue={minUsers} design="basics" closed={closed} />
      </div>
    </div>
  );
}
